import { Container } from "@material-ui/core";
import { MDBContainer } from "mdbreact";

function Footer() {
  return (
    <Container>
      <div className="footer-copyright text-center py-3 fixed-bottom">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright
        </MDBContainer>
      </div>
    </Container>
  );
}

export default Footer;
