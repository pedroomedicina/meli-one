import {Alert, Typography} from "@mui/material";

export function UnverifiedAccount (props) {
  return <Alert severity={props.severity || "warning"} data-testid={'unverified-account-alert'}>
    <Typography>{props.message || '¡Verifica tu cuenta para poder acceder a miles de productos y servicios!'}</Typography>
  </Alert>
}