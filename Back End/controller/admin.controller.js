const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const admin = require('../model/admin.model')
const bcrypt = require("bcrypt")


const createAdmin = asyncHandler (async(req, res) => {
    const { name, email, password } = req.body;
    const user = await admin.findOne({ email });

    if (user) {
        return res.status(400).json({ message: 'Admin already exists' });
    }
    try{
        const hashedPassward = await bcrypt.hash(password , 10 )
        const newAdmin = await admin.create({ name, email, password: hashedPassward })
        if(newAdmin) {
            res.status(200).json({ message: 'admin created successfully' });
        }

    }catch(err)
    {
        res.status(500).json({ message: err.message })
    }
})

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const availableAdmin = await admin.findOne({ email })
    if (!availableAdmin) {
        
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const ismatch = await bcrypt.compare( password , availableAdmin.password);
    try{
        if(!ismatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const accessToken = tokenCreation(availableAdmin)
        console.log(accessToken)


        res.cookie("token", accessToken, {
            httpOnly: true,
            secure : true,
            maxAge : 3600000, // 1 hour
        })
        
    }catch(err){
        res.status(500).json({ message: err.message })
    }

})

const tokenCreation = (data) => {
    const payload = {
        username : data.name,
        email : data.email,
        password : data.password,
        id : data.id,
    }

    const acesstoken = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn : '1h'
    })

    return acesstoken
}

const logOutAdmin = asyncHandler( async(req, res) => {
    res.clearCookie("token").json({message: "cookie cleared sucessfully"})
})


module.exports = { createAdmin, loginAdmin, logOutAdmin }