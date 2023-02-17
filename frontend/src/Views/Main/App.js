import {Container, Typography} from "@mui/material";
import WithNavigation from "../../components/WithNavigation/WithNavigation";
import {WithRestrictions} from "../../components/WithRestrictions/WithRestrictions";

function App() {
  return (
    <>
      <WithRestrictions />
      <WithNavigation>
        <Container>
          <Typography>PRODUCTOS</Typography>
        </Container>
      </WithNavigation>
    </>
  );
}

export default App;
