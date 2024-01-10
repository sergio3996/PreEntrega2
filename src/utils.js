import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const PRIVATE_KEY = "CoderSecret";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: "Unauthorized" });
    if (req.user.role != role) {
      return res.status(403).send({ error: "No Permissions" });
    }
    next();
  };
};
// export const authToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).send({ error: "Not authenticated" });
//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
//     if (error) return res.status(403).send({ error: "not authorized" });
//     req.user = credentials.user;
//     next();
//   });
// };
