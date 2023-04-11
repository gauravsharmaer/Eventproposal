const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./src/router/Userauth')
const vendorRouter = require('./src/router/VendorAuth')
const proposalRouter = require("./src/router/Proposal");
require('./src/db/conn')
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use("/api/vendor",vendorRouter)
app.use("/api/proposal", proposalRouter);
app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}`)
})

