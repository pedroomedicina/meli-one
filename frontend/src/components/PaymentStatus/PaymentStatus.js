import {Typography} from "@mui/material";

export const PaymentStatus = (props) => {
  const color = props['estado'] === 'realizada' ? 'green' : props['estado'] === 'rechazada' ? 'red' : 'black'
  return <Typography sx={{color, fontWeight: 600}}>{props['estado']}</Typography>
}