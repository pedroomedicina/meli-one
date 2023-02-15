const express = require('express')
const MercadolibreService = require("../services/MercadoLibreService/MercadolibreService")
const router = express.Router()

router.get('/', async (req, res) => {
  const mercadolibreService = new MercadolibreService()
  res.json(await mercadolibreService.getUser())
})

router.get('/nivel', async (req, res) => {
  const servicioMercadolibre = new MercadolibreService()
  res.json(await servicioMercadolibre.getLevel(req.query['id_nivel']))
})

router.get('/restricciones', async (req, res) => {
  const servicioMercadolibre = new MercadolibreService()
  res.json(await servicioMercadolibre.getUserRestrictions(req.query['id_usuario']))
})

module.exports = router