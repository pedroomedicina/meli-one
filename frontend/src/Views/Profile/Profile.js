import WithNavigation from "../../components/WithNavigation/WithNavigation";
import {WithRestrictions} from "../../components/WithRestrictions/WithRestrictions";

function Profile() {
  return (
    <>
      <WithRestrictions />
      <WithNavigation />
    </>
  );
}

export default Profile;
