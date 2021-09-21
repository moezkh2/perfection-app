const router = require('express').Router();
const user = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerRoles, loginRoles, updateRoles, validation } = require('../middlewere/Validator');
const isAuth = require('../middlewere/PassPort');

// register user

router.post("/register", registerRoles(), validation, async (req, res) => {
    try {
        let newUser = new user({
            name: req.body.name,
            email: req.body.email,
            PassWord: req.body.PassWord,
            Role: req.body.Role
        })
        // verify if the user alredy have a account
        let registerUser = await user.findOne({ email: req.body.email })
        //if there is no account with this email,hash password
        if (registerUser) { return res.send({ msg: "user alredy exist" }) }
        const salt = 10;
        const genSalt = await bcrypt.genSalt(salt)
        const cryptedPassWord = await bcrypt.hash(newUser.PassWord, genSalt)
        newUser.PassWord = cryptedPassWord
        let result = await newUser.save()
        const payload = {
            _id: result._id,
            name: result.name
        };
        const token = await jwt.sign(payload, process.env.SecretOrKey, { expiresIn: '1h' })
        res.send({ msg: "account created", token: `Bearer ${token}`, user: { name: result.name, email: result.email, Role: result.Role } })
    } catch (error) {
        res.status(400).send({ msg: "can not create account" })
        console.log(error)
    }
})

//login user

router.post("/login", async (req, res) => {
    try {
        //search for user in the database by email
        let result = await user.findOne({ email: req.body.email })
        // if user have a count compare password
        const match = await bcrypt.compare(req.body.PassWord, result.PassWord)
        if (result && match) {
            const payload = {
                _id: result._id,
                name: result.name
            };
            // create token and send it to the user
            const token = await jwt.sign(payload, process.env.SecretOrKey, { expiresIn: '1h' })
            await delete result.PassWord;
            if (result.IsBlocked) {
                return res.status(400).send({ msg: "user blocked" })
            }
            res.send({ token: `Bearer ${token}`, user: { name: result.name, email: result.email, Role: result.Role, Speciality: result.Speciality, phone: result.phone, address: result.address } })
        } else {
            res.status(400).send({ msg: "fail login" })
        }
    } catch (error) {
        res.status(400).send({ msg: "fail login" })
        console.log(error)
    }
})
// get the user if isAuth
router.get("/profil", isAuth(), async (req, res) => {
    res.send({ user: req.user })
})
// update the user information if isAuth
router.put("/update", isAuth(), updateRoles(), validation, async (req, res) => {
    try {
        let result = await user.updateOne({ email: req.body.email }, req.body)
        res.send({ msg: 'user updated' })
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'can not update user' })
    }
})
//get tchnician list if isAuth
router.get("/gettechnicianlist/:technician", isAuth(), async (req, res) => {
    try {
        let result = await user.find({ Speciality: req.params.technician })
        if (result.length === 0) { return res.send({ techlist: result, msg: 'no technician available' }) }
        res.send({ techlist: result, msg: 'technician list' })
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'can not get technician list' })
    }
})

router.get("/getttechnicianlist/all", isAuth(), async (req, res) => {
    try {
        let result = await user.find({ Role: 'technician' })
        if (result.length === 0) { return res.send({ tech: result, msg: 'no technician available' }) }
        res.send({ tech: result, msg: 'All technician list' })
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'can not get all technician list' })
    }
})
router.delete('/technician/delete/:id', isAuth(), async (req, res) => {
    try {
        let result = await user.findByIdAndRemove(req.params.id)
        res.send({ msg: 'technician deleted' })
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'can not delete technician' })
    }
})
router.get("/getclients/all", isAuth(), async (req, res) => {
    try {
        let result = await user.find({ Role: 'client' })
        if (result.length === 0) { return res.send({ client: result, msg: 'no client available' }) }
        res.send({ client: result, msg: 'All client list' })
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'can not get all client list' })
    }
})
router.delete('/client/delete/:id', isAuth(), async (req, res) => {
    try {
        let result = await user.findByIdAndRemove(req.params.id)
        res.send({ msg: 'client deleted' })
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'can not delete client' })
    }
})
router.put("/adminupdate", isAuth(), async (req, res) => {
    try {
        let result = await user.updateOne({ email: req.body.email }, req.body)
        res.send({ msg: 'user updated' })
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'can not update user' })
    }
})

module.exports = router
