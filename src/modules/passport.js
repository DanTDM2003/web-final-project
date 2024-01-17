const passport = require('passport');
const bcrypt = require('bcrypt');
const axios = require('axios');
const https = require('https');

const LoginStrategy = require('../utilities/LoginStrategy.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Users = require('../models/Users.js');
const Carts = require('../models/Carts.js');

const JWTAction = require('../utilities/JWTAction.js');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

passport.serializeUser((user, done) => {
    done(null, user.Email);
});

passport.deserializeUser(async (user, done) => {
    const auth = await Users.findOne({ Email: user });
    delete auth.Password;
    delete auth.Login_by;
    if (auth) {
        return done(null, auth);
    }
    done({ credential: "Your credential is invalid." });
});

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LoginStrategy(async (email, password, done) => {
        try {
            const user = await Users.findOne({ Email: email });
            
            if (user) {
                const rs = await bcrypt.compare(password, user.Password);
                if (rs) {
                    return done(null, user);
                }
            }

            done({ credential: "Your credential is invalid." }, null);
        } catch (error) {
            done({ error: "Something wrong happens." });
        }
    }));
    passport.use(new GoogleStrategy({
            clientID: '48072687713-pfnnfq40s94op9g3vok6b299g1ohq3oc.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: "https://localhost:8888/auth/google/callback"
        },
        async function(accessToken, refreshToken, profile, done) {
            try {
                let user = await Users.findOne({ Email: profile.emails[0].value });
                
                if (!user) {
                    await Users.add({ Fullname: profile.displayName, Username: profile.displayName, Email: profile.emails[0].value, Role: 'User', Login_by: 'Google' });
                    user = await Users.findOne({ Email: profile.emails[0].value });
                    const token = JWTAction.serverToken();
                    await axios.post(
                        "https://localhost:8001/wallet/create",
                        { User_id: user.id, Balance: 1000 },
                        {
                                headers: { Authorization: `Bearer ${token}` },
                                httpsAgent
                        }
                    );
                    await Carts.add({ User_id: user.id, Cart: '[]' });
                    return done(null, user);
                } else if (user) {
                    if (user.Login_by === "Google") {
                        return done(null, user);
                    } else {
                        return done({ credential: "This email has been used." }, null);
                    }
                }
    
                done({ credential: "Your credential is invalid." }, null);
            } catch (error) {
                done({ error: "Something wrong happens." });
            }
        }
    ));
}