import {Typography} from "@mui/material";
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 2em;
  
  .MuiTypography-root {
    margin-top: 1em;
  }
`

export function UnverifiedAccount () {
  return <Wrapper>
    <SettingsInputCompositeIcon color="neutral" data-testid='unverified-account-icon' />
    <Typography>¡Verifica tu cuenta para poder acceder a miles de productos y servicios!</Typography>
  </Wrapper>
}