import {Alert, Typography} from "@mui/material";

export function UnverifiedAccount (props) {
  return <Alert sx={{padding: '0 10em'}} severity={props.severity || "warning"} data-testid={'unverified-account-alert'}>
    <Typography>{props.message || '┬íVerifica tu cuenta para poder acceder a miles de productos y servicios!'}</Typography>
  </Alert>
}