import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, CardHeader} from "@mui/material";
import moment from 'moment';
import {useNavigate} from "react-router-dom";

export function PurchaseListItem({purchase}) {
  const navigate = useNavigate()
  const {fecha, imagen, titulo, vendedor, cantidad, id_compra, precio} = purchase
  const unidades = cantidad > 1 ? `${cantidad} unidades` : '1 unidad'
  const isCurrentYear = new Date(fecha).getUTCFullYear() === new Date().getUTCFullYear()
  const fechaFormateada = moment(fecha).format(isCurrentYear ? 'L' : 'LL')

  const goToPurchaseDetail = ({id_compra}) => navigate(`/my-purchases/${id_compra}`)

  return (
    <Card sx={{width: '100%'}}>
      <CardHeader sx={{borderBottom: '1px solid rgba(0,0,0,.1)'}}
                  title={fechaFormateada} data-testid="purchase-date"
                  titleTypographyProps={{variant: 'subtitle2', sx: {fontWeight: 'bold'}}} />
      <CardContent sx={{display: 'flex'}}>
        <Box sx={{display: 'flex', flex: 2}}>
          <CardMedia
            sx={{height: 74, width: 74, borderRadius: '6px', backgroundSize: 'contain'}}
            image={imagen}
          />
          <Box sx={{marginLeft: '1em'}}>
            <Typography variant="subtitle1" component="div">
              identificador: #{id_compra}
            </Typography>
            <Typography variant="body2" component="div">
              {titulo}
            </Typography>
            <Typography variant="body2" component="div">
              {unidades}
            </Typography>
            <Typography variant="body2" component="div">
              Costo: {precio['moneda']} {precio['total'].toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Box sx={{display: 'flex', flex: 1, justifyContent: 'center'}}>
          <Typography variant="body2" color="text.secondary">
            {vendedor['nickname']}
          </Typography>
        </Box>
        <CardActions sx={{alignItems: 'start', padding: '0 0.5em'}}>
          <Button size="small" variant="contained" onClick={() => goToPurchaseDetail(purchase)}>Ver Compra</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}