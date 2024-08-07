const express = require('express')
const cors = require('cors')
const connectDb = require('./Config/dbCOnnection')
const route = require('./Routes/bookRoutes')
const route2 = require('./Routes/admin.routes')
const dotenv = require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000

app.use('/books/', route)
app.use('/admin/', route2 )

connectDb().then(() => {
    app.listen(port, () =>{
        console.log(`Server is running on port ${port}`)
    })
})
     