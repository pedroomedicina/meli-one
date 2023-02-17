import WithNavigation from "../../components/WithNavigation/WithNavigation";
import {WithRestrictions} from "../../components/WithRestrictions/WithRestrictions";

function App() {
  return (
    <>
      <WithRestrictions />
      <WithNavigation />
    </>
  );
}

export default App;
