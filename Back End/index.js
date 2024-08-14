const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDb = require('./Config/dbCOnnection')
const route = require('./Routes/bookRoutes')
const route2 = require('./Routes/admin.routes')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',  // Replace with your frontend URL
    credentials: true  // Enable sending of cookies and credentials
  }));
app.use(cookieParser())
const port = process.env.PORT || 3000

app.use("/uploads/images", express.static(path.resolve(__dirname, "./uploads/images")))

app.use('/books/', route)
app.use('/admin/', route2 )

 
connectDb().then(() => {
    app.listen(port, () =>{
        console.log(`Server is running on port ${port}`)
    })
})

