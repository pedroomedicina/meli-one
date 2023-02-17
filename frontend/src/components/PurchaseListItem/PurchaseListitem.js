import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, CardHeader} from "@mui/material";
import moment from 'moment';

export default function PurchaseListitem({purchase}) {
  const {fecha, imagen, titulo, vendedor, cantidad} = purchase

  const unidades = cantidad > 1 ? `${cantidad} unidades` : '1 unidad'
  const isCurrentYear = new Date(fecha).getUTCFullYear() === new Date().getUTCFullYear()
  const fechaFormateada = moment(fecha).format(isCurrentYear ? 'L' : 'LL')

  return (
    <Card sx={{width: '100%'}}>
      <CardHeader sx={{borderBottom: '1px solid rgba(0,0,0,.1)'}}
                  title={fechaFormateada} titleTypographyProps={{variant: 'h6'}}/>
      <CardContent sx={{display: 'flex'}}>
        <Box sx={{display: 'flex', flex: 2}}>
          <CardMedia
            sx={{height: 74, width: 74, borderRadius: '6px', backgroundSize: 'contain'}}
            image={imagen}
            title="green iguana"
          />
          <Box sx={{marginLeft: '1em'}}>
            <Typography variant="body1" component="div">
              ...Datos de envio...
            </Typography>
            <Typography variant="body2" component="div">
              {titulo}
            </Typography>
            <Typography variant="body2" component="div">
              {unidades}
            </Typography>
          </Box>
        </Box>
        <Box sx={{display: 'flex', flex: 1, justifyContent: 'center'}}>
          <Typography variant="body2" color="text.secondary">
            {vendedor['nickname']}
          </Typography>
        </Box>
        <CardActions sx={{alignItems: 'start', padding: '0 0.5em'}}>
          <Button size="small">Ver Compra</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}