import passport from "passport";
import userModel from "../dao/models/user.model.js";
import GitHubStrategy from "passport-github2";
import jwt from "passport-jwt";
import config from "./config.js";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.4f3de2a1f73e231c",
        clientSecret: "aa9347807285d5a7c3681f859fdc78270d6f0e44",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              password: "",
            };
            let user = await userModel.create(newUser);
            return done(null, user);
          }
          done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: config.jwtSecret,
  };
  passport.use(
    "jwt",
    new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload.user);
      } catch (error) {
        return done(error);
      }
    })
  );
};

export default initializePassport;
