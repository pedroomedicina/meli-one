import {Typography} from "@mui/material";

export const ShipmentStatus = (props) => {
  const color = props['estado'] === 'entregado' ? 'green' : props['estado'] === 'cancelado' ? 'red' : 'black'
  return <Typography sx={{color, fontWeight: 600}}>{props['estado']}</Typography>
}