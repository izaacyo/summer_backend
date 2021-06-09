const User = require('../models/users');
const { SECRET } = require('../config')
const { Strategy, ExtractJwt } = require('passport-jwt')





module.exports = (passport) => {


    const opt = {}
    opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opt.secretOrKey = SECRET

    passport.use(new Strategy(opt, async (payload, done) => {
        await User.findById(payload.user_id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false)
            })
            .catch(err => {
                return done(null, false)
            })
    }))
}