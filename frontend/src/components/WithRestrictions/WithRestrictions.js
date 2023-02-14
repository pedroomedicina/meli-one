import {UnverifiedAccount} from "../UnverifiedAccount/UnverifiedAccount";
import {Skeleton} from "@mui/material";
import styled from "@emotion/styled";
import {useRestrictions} from "../../hooks/useRestrictions";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;

  .MuiSkeleton-root {
    width: 100%;
    height: 3em;
  }
`

export function WithRestrictions({children}) {
  const {loadingRestrictions, restrictions} = useRestrictions()

  const accountIsNotYetVerified = restrictions.length && restrictions.find(restriction => restriction['mensaje'].includes('Tu cuenta no ha sido verificada'))
  const Panel = () => accountIsNotYetVerified ? <UnverifiedAccount/> : <>{children}</>

  return loadingRestrictions ? <Wrapper><Skeleton variant="rectangular"/></Wrapper> : <Panel/>
}