package collector;

/*
 * This class represents the finite state machine of a Door.  
* It decides when to run the "sender" routine based on sensor events
 */

/**
 *
 * @author jmuzzin
 */
public class Door {
	public enum State{
		WAITING,
		BETWEEN,
		SENDING
	}

	public Door(Runnable sender) {
		this.sender = sender;
	}
	private State state=State.WAITING;
	private Runnable sender;
	public void firstSensorTrip(){
		if(state==State.WAITING){
			state=State.BETWEEN;
		}
	}
	public void secondSensorTrip(){
		if(state==State.BETWEEN){
			state=State.SENDING;
			sender.run();
			state=State.WAITING;
		}
	}
	
}
