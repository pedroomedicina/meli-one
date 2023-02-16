const express = require('express')
const cors = require('cors')
const app = express()

const user = require('./routers/user')

app.use(cors())
app.use(user)

module.exports = app