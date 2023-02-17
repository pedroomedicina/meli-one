const express = require('express')
const MercadolibreService = require("../../services/MercadoLibreService/MercadolibreService")
const router = express.Router()

router.get('/', async (req, res) => {
  const mercadolibreService = new MercadolibreService()
  res.json(await mercadolibreService.getUser())
})

router.get('/nivel', async (req, res) => {
  if(!req.query['id_nivel']) {
    return res.status(400).send('Required query params missing')
  }

  const servicioMercadolibre = new MercadolibreService()
  try {
    return res.json(await servicioMercadolibre.getLevel(req.query['id_nivel']))
  } catch (e) {
    return res.status(e.status).send(e.message)
  }
})

router.get('/restricciones', async (req, res) => {
  if(!req.query['id_usuario']) {
    return res.status(400).send('Required query params missing')
  }

  const servicioMercadolibre = new MercadolibreService()
  try {
    return res.json(await servicioMercadolibre.getUserRestrictions(req.query['id_usuario']))
  } catch (e) {
    return res.status(e.status).send(e.message)
  }
})

module.exports = router