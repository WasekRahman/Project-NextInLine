package collector;

import com.fazecast.jSerialComm.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 *
 * @author jmuzzin
 */
public class Collector {

	/**
	 * This class represents a single sensor. It receives events from the
	 * serial port and sends events to Door when tripped
	 */
	private static class DataListener implements SerialPortDataListener {

		private DoorAutomata door;
		private boolean first;
		private boolean tripped = false;

		public DataListener(DoorAutomata door, boolean first) {
			this.door = door;
			this.first = first; //if i am the first or second sensor on the door
		}

		@Override
		public int getListeningEvents() {
			return SerialPort.LISTENING_EVENT_DATA_AVAILABLE;
		}

		@Override
		public void serialEvent(SerialPortEvent event) {
			if (event.getEventType() != SerialPort.LISTENING_EVENT_DATA_AVAILABLE) {
				return;
			}
			byte[] newData = new byte[event.getSerialPort().bytesAvailable()];

			int numRead = event.getSerialPort().readBytes(newData, newData.length);
			String wth = new String(newData, StandardCharsets.UTF_8);
			for (String reading : wth.split("\r")) {
				if (Integer.parseInt(reading.substring(1)) < 2500 && !tripped) {
					System.out.println("sensor " + event.getSerialPort().getSystemPortName() + " trip");
					if (first) {
						door.firstSensorTrip();
						tripped = true;
					} else {
						door.secondSensorTrip();
						tripped = true;
					}
				}
				if (Integer.parseInt(reading.substring(1)) > 2500 && tripped) {
					tripped = false;
				}
			}
		}
	}

	public static void main(String[] args) {
		List<Door> doors = API.getDoors();
		/*Set everything up and run */
		for (Door door : doors) {
			final DoorAutomata doorFSM = new DoorAutomata(new Runnable() {
				@Override
				public void run() {
					API.sendEvent(door._id);
					System.out.println("Door " + door._id + " entered/exitted");
				}
			});
			SerialPort comPort1 = SerialPort.getCommPort(door.sensor1comport);
			comPort1.setComPortParameters(57600, 8, 1, 0);
			comPort1.setFlowControl(SerialPort.FLOW_CONTROL_DISABLED);
			comPort1.openPort();
			comPort1.addDataListener(new DataListener(doorFSM, true));
			System.out.println("Listening on "+comPort1.getSystemPortName());

			SerialPort comPort2 = SerialPort.getCommPort(door.sensor2comport);
			comPort2.setComPortParameters(57600, 8, 1, 0);
			comPort2.setFlowControl(SerialPort.FLOW_CONTROL_DISABLED);
			comPort2.openPort();
			comPort2.addDataListener(new DataListener(doorFSM, false));
			System.out.println("Listening on "+comPort2.getSystemPortName());
		}

		while (true) {
			try {
				Thread.sleep(100);
			} catch (InterruptedException ie) {
			}
		}
	}
}
