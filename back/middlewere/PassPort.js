const passport = require('passport');
const user = require('../Models/user')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config({path:'../.env'})
const  opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey  : process.env.SecretOrKey
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done)=> {
        try {
            const Currentuser = await user.findOne({_id:jwt_payload._id}).select("-PassWord")
            Currentuser ? done(null, Currentuser): done(null, false)
        } catch (error) {
            console.log(error)
        }
}));
module.exports = isAuth=()=> passport.authenticate("jwt",{session:false});