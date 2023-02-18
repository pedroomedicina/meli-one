const express = require('express')
const MercadolibreService = require("../../services/MercadoLibreService/MercadolibreService")
const router = express.Router()

router.get('/compras_usuario', async (req, res) => {
  const { id_usuario: idUsuario, limit, offset } = req.query

  if(!idUsuario) {
    return res.status(400).send('Required query params missing')
  }

  const servicioMercadolibre = new MercadolibreService()
  try {
    return res.json(await servicioMercadolibre.getUserPurchases(idUsuario, limit, offset))
  } catch (e) {
    return res.status(e.status).send(e.message)
  }
})

router.get('/envio', async (req, res) => {
  const { id_envio: idEnvio } = req.query

  if(!idEnvio) {
    return res.status(400).send('Required query params missing')
  }

  const servicioMercadolibre = new MercadolibreService()
  try {
    return res.json(await servicioMercadolibre.getShipment(idEnvio))
  } catch (e) {
    return res.status(e.status).send(e.message)
  }
})

router.get('/pago', async (req, res) => {
  const { id_transaccion: idTransaccion } = req.query

  if(!idTransaccion) {
    return res.status(400).send('Required query params missing')
  }

  const servicioMercadolibre = new MercadolibreService()
  try {
    return res.json(await servicioMercadolibre.getPayment(idTransaccion))
  } catch (e) {
    return res.status(e.status).send(e.message)
  }
})

module.exports = router