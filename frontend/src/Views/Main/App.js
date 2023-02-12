import {Container, Typography} from "@mui/material";
import WithNavigation from "../../components/WithNavigation/WithNavigation";

function App() {
  return (
    <WithNavigation>
      <Container>
        <h1>The app works!</h1>
        <Typography>Material UI kit works!</Typography>
      </Container>
    </WithNavigation>
  );
}

export default App;
