
package collector;

/**
 *
 * @author jmuzzin
 */
public class Door implements java.io.Serializable {
	public String _id;
	public String name;
	public String sensor1comport;
	public String sensor2comport;
	public String buildingID;
	public boolean entrance_exit;

	@Override
	public String toString() {
		return "Door{" + "_id=" + _id + ", name=" + name + ", sensor1comport=" + sensor1comport + ", sensor2comport=" + sensor2comport + ", buildingID=" + buildingID + ", entrance_exit=" + entrance_exit + '}';
	}
}
