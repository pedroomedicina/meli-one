import {Container, Typography} from "@mui/material";
import WithNavigation from "../../components/WithNavigation/WithNavigation";
import {WithRestrictions} from "../../components/WithRestrictions/WithRestrictions";

function Profile() {
  return (
    <>
      <WithRestrictions />
      <WithNavigation>
        <Container>
          <Typography>Profile route works!</Typography>
        </Container>
      </WithNavigation>
    </>
  );
}

export default Profile;
