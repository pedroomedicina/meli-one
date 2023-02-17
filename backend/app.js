const express = require('express')
const cors = require('cors')
const app = express()

const user = require('./routers/users/user')
const purchases = require('./routers/purchases/purchases')

app.use(cors())
app.use(user)
app.use('/compras', purchases)

module.exports = app