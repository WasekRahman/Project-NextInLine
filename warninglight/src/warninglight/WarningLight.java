/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package warninglight;

import java.util.List;

/**
 *
 * @author jmuzzin
 */
public class WarningLight {

	
	public static void main(String[] args) {
		//commented out for testing on PC
		//Java2PiLED light = new Java2PiLED();
		while(true){
			List<Building> buildings = API.getBuildings();
			for(Building b : buildings){
				if(b.occupancy>=b.capacity){
					//commented out for testing
					//light.on();
					System.out.println("Light on");
					break;
				}else{
					//commented out for testing
					//light.off();
					System.out.println("Light off");
				}
			}
			try{
			Thread.sleep(5000);
			}catch(InterruptedException ie){}
		}
	}
	
}
