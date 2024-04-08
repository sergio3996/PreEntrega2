import passport from "passport";
import userModel from "../dao/models/user.model.js";
import GitHubStrategy from "passport-github2";
import jwt from "passport-jwt";
import CartService from "../services/cart.service.js";

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
        callbackURL: "http://localhost:8080/api/auth/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            const cart = await CartService.create();
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              password: "",
              last_connection: new Date(),
              cart: cart._id,
            };
            let user = await userModel.create(newUser);
            return done(null, user);
          }
          user.last_connection = new Date();
          user.save();
          done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
