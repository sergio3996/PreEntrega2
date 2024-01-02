import passport from "passport";
// import { createHash, isValidPassword } from "../utils.js";
import UsersManager from "../dao/Users.manager.js";
import userModel from "../dao/models/user.model.js";
// import { Strategy as LocalStrategy } from "passport-local";
import GitHubStrategy from "passport-github2";
import jwt from "passport-jwt";

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
    secretOrKey: "CoderSecret",
  };
  passport.use(
    "jwt",
    new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload);
      } catch (error) {
        return done(error);
      }
    })
  );

  const registerOpts = {
    passReqToCallback: true,
    usernameField: "email",
  };

  // passport.use(
  //   "register",
  //   new LocalStrategy(registerOpts, async (req, email, password, done) => {
  //     const { first_name, last_name, age } = req.body;

  //     if (!first_name || !last_name) {
  //       return done(new Error("Todos los campos excepto edad son requerido"));
  //     }

  //     const user = await UsersManager.getOne(email);
  //     if (user) {
  //       return done(new Error("Ya existe un usuario con esas credenciales"));
  //     }

  //     let passwordHashed = createHash(password);

  //     let newUser = {
  //       first_name,
  //       last_name,
  //       email,
  //       age,
  //       password: passwordHashed,
  //     };

  //     try {
  //       const user = await UsersManager.create(newUser);
  //       done(null, user);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   })
  // );

  // passport.use(
  //   "login",
  //   new LocalStrategy(
  //     { usernameField: "email" },
  //     async (email, password, done) => {
  //       if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
  //         const user = {
  //           _id: "adminId",
  //           first_name: "Coder",
  //           last_name: "House",
  //           email,
  //           age: "&&",
  //           role: "admin",
  //         };
  //         return done(null, user);
  //       }
  //       const user = await UsersManager.getOne(email);
  //       if (!user) {
  //         return done(new Error("Email o Contraseña invalidos"));
  //       }
  //       if (!isValidPassword(user, password)) {
  //         return done(new Error("Email o Contraseña invalidos"));
  //       }
  //       done(null, user);
  //     }
  //   )
  // );

  // passport.deserializeUser(async (uid, done) => {
  //   if (uid === "adminId") {
  //     const user = {
  //       _id: "adminId",
  //       first_name: "Coder",
  //       last_name: "House",
  //       email: "adminCoder@coder.com",
  //       age: "&&",
  //       role: "admin",
  //     };
  //     return done(null, user);
  //   }
  //   const user = await userModel.findById(uid);
  //   done(null, user);
  // });

  // passport.serializeUser(async (user, done) => {
  //   done(null, user._id);
  // });
};

export default initializePassport;
