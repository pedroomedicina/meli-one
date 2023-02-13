const express = require('express')
const cors = require('cors')
const app = express()
const port = 3002

const user = require('./routers/user')

app.use(cors())
app.use(user)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})