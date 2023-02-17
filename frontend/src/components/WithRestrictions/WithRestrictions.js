import {UnverifiedAccount} from "../UnverifiedAccount/UnverifiedAccount";
import {useRestrictions} from "../../hooks/useRestrictions";


export function WithRestrictions({children}) {
  const {restrictions} = useRestrictions()

  const accountIsNotYetVerifiedRestriction = Array.isArray(restrictions) &&
    restrictions.find(restriction => restriction['mensaje']
      .includes('Tu cuenta no ha sido verificada')
    )
  const Panel = () => <>
    {accountIsNotYetVerifiedRestriction &&
      <UnverifiedAccount
        severity={accountIsNotYetVerifiedRestriction['tipo']}
        message={accountIsNotYetVerifiedRestriction['mensaje']}
      />}
    {children}
  </>

  return <>
    <Panel/>
  </>
}