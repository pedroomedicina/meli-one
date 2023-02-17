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

module.exports = router