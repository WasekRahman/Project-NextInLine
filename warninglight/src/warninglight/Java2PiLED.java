package warninglight;

import com.pi4j.io.gpio.*;

public class Java2PiLED 
{
	GpioPinDigitalOutput light = GpioFactory.getInstance().provisionDigitalOutputPin(RaspiPin.GPIO_00);
	
	public  void on()
	{
		light.high();
	}
	
	public  void off()
	{
		light.low();
	}
	
}
