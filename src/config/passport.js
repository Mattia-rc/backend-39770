import passport from "passport";
import { Strategy } from "passport-local";
import Users from "../models/user.model.js";
import GHStrategy from "passport-github2"
import jwt from "passport-jwt"
const callback = "http://localhost:8080/api/auth/github/callback"
export default function () {
    passport.serializeUser(
        (user, done) => done(null, user._id)
    )
    passport.deserializeUser(
        async (id, done) => {
            const user = await Users.findById(id)
            return done(null, user)
        }
    )
    passport.use(
        'register',
        new Strategy(
            { passReqToCallback: true, usernameField: 'mail' },
            async (req, userName, password, done) => {
                try {
                    let one = await Users.findOne({ mail: userName })
                    if (!one) {
                        let user = await Users.create(req.body)
                        return done(null, user)
                    }
                    return done(null, false)
                } catch (error) {
                    return done(error, false)
                }
            }
        )
    )

    passport.use(
        'signin',
        new Strategy(
            { usernameField: 'mail' },
            async (userName, password, done) => {
                try {
                    let one = await Users.findOne({ mail: userName })
                    if (one) {
                        return done(null, one)
                    }
                    return done(null, false)
                } catch (error) {
                    return done(error, false)
                }
            }
        )
    )

    passport.use(
        'github',
        new GHStrategy(
            { clientID: process.env.GITHUB_CLIENTID, clientSecret: process.env.GITHUB_SECRET, callbackURL: callback },
            async(accessToken,refreshToken,profile,done)=>{
                try {
                    console.log(profile)
                    let one = await Users.findOne({ email: profile._json.login })//los datos del usauario vienen de github(la propiedad profile no del formulario)
                    if(one){                                                     //si encuentro un usuario, inyecto la propiedad req.user cn los dats de one para poder directamente loguearlo
                        return done(null, one)                                  
                    }
                    let user = await Users.create({
                       name: profile._json.name,
                       mail: profile._json.login,
                       age:18,
                       password: 'hola1234',
                       photo:profile._json.avatar_url
                    })
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    
    passport.use("jwt",
        new jwt.Strategy({
            jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req) => req?.cookies.token ]),
            secretOrKey: process.env.JWT_SECRET
        },
        async (jwt_payload, done) => {
            try {
                const user = await Users.findOne({mail: jwt_payload.mail})
                if (user) {
                    delete user.password
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch(err) {
                return done(err, false)
            }
        })
    )

}