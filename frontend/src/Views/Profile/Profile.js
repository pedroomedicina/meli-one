import {Container, Typography} from "@mui/material";
import WithNavigation from "../../components/WithNavigation/WithNavigation";

function Profile() {
  return (
    <WithNavigation>
      <Container>
        <Typography>Profile route works!</Typography>
      </Container>
    </WithNavigation>
  );
}

export default Profile;
