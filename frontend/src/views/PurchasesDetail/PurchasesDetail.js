import {Avatar, Box, Breadcrumbs, Container, Divider, Link, Paper, Skeleton, Typography} from "@mui/material";
import WithNavigation from "../../components/WithNavigation/WithNavigation";
import {WithRestrictions} from "../../components/WithRestrictions/WithRestrictions";
import {Navigate, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import {PurchasesContext} from "../../contexts/PurchasesProvider";
import moment from "moment/moment";
import {proxy_api_url} from "../../settings/Services";
import {ShipmentStatus} from "../../components/ShipmentStatus/ShipmentStatus";
import {PaymentStatus} from "../../components/PaymentStatus/PaymentStatus";

export const PurchaseDetail = () => {
  const params = useParams()
  const paramsError = !params['id_compra']
  const {purchases: storedPurchases} = useContext(PurchasesContext)
  const purchase = Array.isArray(storedPurchases) && storedPurchases.find(purchase => purchase['id_compra'].toString() === params['id_compra'].toString())

  const isCurrentYear = new Date(purchase?.['fecha']).getUTCFullYear() === new Date().getUTCFullYear()
  const fechaFormateada = moment(purchase?.['fecha']).format(isCurrentYear ? 'L' : 'LL')

  const [loadingPayment, setLoadingPayment] = useState(false)
  const [, setErrorLoadingPayment] = useState('')
  const [payment, setPayment] = useState()
  const loadPayment = useCallback(async () => {
    if(!purchase) {
      return
    }
    try {
      setLoadingPayment(true)
      const paymentResponse = await fetch(`${proxy_api_url}/compras/pago?id_transaccion=${purchase?.['id_transaccion']}`)
      const paymentInfo = await paymentResponse.json()
      setPayment(paymentInfo)
      console.log(paymentInfo)
    } catch (error) {
      setErrorLoadingPayment('Algo salio mal al cargar tu nivel')
    } finally {
      setLoadingPayment(false)
    }
  }, [purchase])

  const [loadingShipment, setLoadingShipment] = useState(false)
  const [, setErrorLoadingShipment] = useState('')
  const [shipment, setShipment] = useState()
  const loadShipment = useCallback(async () => {
    if(!purchase) {
      return
    }
    try {
      setLoadingShipment(true)
      const paymentResponse = await fetch(`${proxy_api_url}/compras/envio?id_envio=${purchase?.['id_envio']}`)
      const shipmentInfo = await paymentResponse.json()
      setShipment(shipmentInfo)
      console.log(shipmentInfo)
    } catch (error) {
      setErrorLoadingShipment('Algo salio mal al cargar tu nivel')
    } finally {
      setLoadingShipment(false)
    }
  }, [purchase])

  useEffect(() => {
    loadPayment()
    loadShipment()
  }, [purchase, loadShipment, loadPayment])

  return paramsError || !purchase ? <Navigate to="/"/> : <>
    <WithRestrictions/>
    <WithNavigation>
      <Container sx={{
        display: 'flex',
        padding: '1em 0',
        width: '100%',
        flex: 1,
        maxWidth: '100% !important',
        background: 'linear-gradient(90deg,#ededed 61%,#f5f5f5 0)',
        margin: '0 !important',
        minHeight: 920
      }}>
        <Container maxWidth="xl" sx={{display: 'flex'}}>
          <Container sx={{width: '60%'}}>
            <Box sx={{margin: '1em 0'}}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/my-purchases">
                  Mis compras
                </Link>
                <Typography color="text.primary">Estado de compra</Typography>
              </Breadcrumbs>
            </Box>
            <Paper elevation={0}
                   sx={{backgroundColor: 'rgb(245, 245, 245)', borderRadius: '8px', display: 'flex', padding: '1em'}}>
              <Box sx={{flex: 1}}>
                <Typography variant="h6" t>{purchase['titulo']}</Typography>
                <Typography variant="body2">{purchase['cantidad'] > 1 ? `${purchase['cantidad']} unidades` : '1 unidad'}</Typography>
              </Box>
              <Avatar
                sx={{height: '48px', width: '48px', 'img': {objectFit: 'contain'}}}
                src={purchase['imagen']} height={48} width={48}/>
            </Paper>
            <Paper elevation={3} sx={{borderRadius: '8px', padding: '1em', margin: '1em 0'}}>
              {loadingShipment ? <Skeleton height={100}/> : <Box sx={{display: 'flex'}}>
                <Typography sx={{marginRight: '1em'}}>Estado del envio: </Typography>
                <ShipmentStatus {...shipment} />
              </Box> }
              {loadingPayment ? <Skeleton height={100}/> : <Box sx={{display: 'flex'}}>
                <Typography sx={{marginRight: '1em'}}>Estado de la transaccion: </Typography>
                <PaymentStatus {...payment} />
              </Box> }
            </Paper>
            <Paper elevation={3} sx={{borderRadius: '8px', padding: '0'}}>
              <Box sx={{flex: 1, borderBottom: '1px solid rgba(0,0,0,.1)', padding: '1em'}}>
                <Typography sx={{fontWeight: 600}} variant={'h6'}>Vendedor</Typography>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'center', padding: '1em'}}>
                <Avatar sx={{height: '48px', width: '48px', marginRight: '1em'}} height={48} width={48}/>
                <Typography>{purchase['vendedor']['nickname']}</Typography>
              </Box>
            </Paper>
          </Container>
          <Container sx={{background: '#f5f5f5', width: '35%', paddingTop: '3.25em'}}>
            <Typography sx={{fontWeight: 600}} variant='h6'>Detalle de la compra</Typography>
            <Box>
              {fechaFormateada} | #{purchase['id_compra']}
            </Box>
            <Divider sx={{margin: '0.5em 0'}}/>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography>{purchase['cantidad'] > 1 ? 'Productos' : 'Producto'}</Typography>
              <Typography>{purchase['precio']['moneda']} {purchase['precio']['total'].toLocaleString()}</Typography>
            </Box>
            <Divider sx={{margin: '0.5em 0'}}/>
            <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '1em'}}>
              <Typography>Total</Typography>
              <Typography>{purchase['precio']['moneda']} {purchase['precio']['total'].toLocaleString()}</Typography>
            </Box>
          </Container>
        </Container>
      </Container>
    </WithNavigation>
  </>
}

