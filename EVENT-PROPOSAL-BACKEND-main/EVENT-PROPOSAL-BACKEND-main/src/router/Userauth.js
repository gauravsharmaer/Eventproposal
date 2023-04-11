const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('./../model/UserSchema')
const Proposal = require('./../model/proposalSchema')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')


router.post('/register', async (req, res) => {
    const { name, email, phone, password, Cpassword } = req.body
    
    try {
        const validateEmail = await User.findOne({ email })
        if (validateEmail) {
            return res.status(401).json({ error: "User Already Exist" })
        }

        const securePass = await bcrypt.hash(password, 12)
        const upload = new User({
            name, email, phone, password: securePass, Cpassword: securePass
        })

        const saveData = await upload.save()
        if (saveData) {
            return res.status(201).json({message:"User register successfull"})
        }


    } catch (err) {
        return res.status(401).send({ error: "Invalid Credentials" })
    }
})

router.post('/login', async (req, res) => {

    try {
        const { data, password } = req.body
        let email = ""
        let phone = ""
        if ((/^[a-z0-9\.]{1,}@[a-z]{1,}\.com$/g).test(data)) {
            email = data
        } else if ((/^[0-9]{10}$/).test(data)) {
            phone = data
        } else {
            return res.status(400).json({ error: "Invalid credentials" })
        }
        const Check = await User.findOne(email ? { email } : { phone })
        if (!Check) {
            return res.status(401).json({ error: "User not registered" })
        }
        const verifyPass = await bcrypt.compare(password, Check.password)
        if (verifyPass) {
            const accessToken = jwt.sign({
                id: Check._id
            }, process.env.JWT_SEC, { expiresIn: "1d" })

            // res.cookie("jwtoken",accessToken,{
            //     expires:new Date(Date.now() + 86400 ),
            //     httpOnly:true,
            //     withCredentials: true
            // })
            const { password, Cpassword, ...data } = Check._doc
            return res.status(201).send({ ...data, token: accessToken })
        } else {
            return res.status(401).json({ error: "password/userId is incorrect" })
        }
    } catch (err) {
        return res.status(401).json({ error: "Invalid credentials" })
    }
})

router.get('/getallproposal', authenticate, async (req, res) => {
    try {
        const data = await Proposal.find()
        if (data) {
            return res.status(201).send(data)
        }

    } catch (err) {
        console.log(err)
    }
})
router.get('/getuserdata/:id', async (req, res) => {
    const id = req.params.id
    try {
        const userData = await User.findOne({ _id: id });
        if (userData) {
            const { password, Cpassword, ...data } = userData._doc
            return res.status(201).send({ ...data });
        }
    } catch (err) {
        //type of error to be decided later
        console.log(err);
    }
})

router.put("/selectproposal/:id", async (req, res) => {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (updateUser) {
        return res.status(201).json({message:"Success"});
      }
    } catch (err) {
      res.status(401).json(err);
    }
  });

module.exports = router