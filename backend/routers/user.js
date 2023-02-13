const express = require('express')
const MercadolibreService = require("../services/MercadoLibreService/MercadolibreService")
const router = express.Router()

router.get('/', async (req, res) => {
  const mercadolibreService = new MercadolibreService()
  res.json(await mercadolibreService.getUser())
})

router.get('/nivel', async (req, res) => {
  const servicioMercadolibre = new MercadolibreService()
  const usuario = await servicioMercadolibre.getUser()
  res.json(await servicioMercadolibre.getLevel(usuario.nivel))
})

module.exports = router