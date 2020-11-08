/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package collector;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author jmuzzin
 */
public class API {

	public static class Timestamp implements java.io.Serializable{

		public Timestamp(String timestamp) {
			this.timestamp = timestamp;
		}
		String timestamp;
	}
	public static void sendEvent(String doorID) {
		Client client = ClientBuilder.newClient();
		WebTarget webTarget = client.target("https://project-next-in-line.herokuapp.com/event/post/"+doorID);
		Invocation.Builder invocationBuilder = webTarget.request(MediaType.APPLICATION_JSON);
		Response r = invocationBuilder.get();
	}

	public static List<Door> getDoors() {
		Client client = ClientBuilder.newClient();
		WebTarget webTarget = client.target("https://project-next-in-line.herokuapp.com/door");
		Invocation.Builder invocationBuilder = webTarget.request(MediaType.APPLICATION_JSON);
		Door[] response = invocationBuilder.get(Door[].class);
		return new ArrayList<Door>(Arrays.asList(response));
	}
}
