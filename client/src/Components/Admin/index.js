import CreateDoor from "../Register/Door";
import { useParams } from "react-router-dom";

console.log("Hello");
function Admin() {
  const { id } = useParams();
  return <CreateDoor buildingID={id} />;
}

export default Admin;
