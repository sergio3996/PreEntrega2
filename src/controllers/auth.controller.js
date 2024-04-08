import UserDTO from "../dto/user.dto.js";
import AuthService from "../services/auth.service.js";
import emailService from "../services/email.service.js";

export const login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body);
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: false,
      })
      .redirect("/products");
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

export const logout = (req, res) => {
  return res.clearCookie("token").redirect("/");
};

export const current = (req, res) => {
  return res.status(200).json(new UserDTO(req.user));
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const token = await AuthService.forgotPassword(email);
    const result = await emailService.sendMail(
      email,
      "Recuperacion de contraseña",
      `<p>Has solicitado un restablecimiento de contraseña.</p>
       <p>Para restablecer tu contraseña, haz clic en este <a href="https://pithy-station-production.up.railway.app/reset-password/${token}">enlace</a>.</p>`
    );
    res.status(200).json({
      message:
        "Te hemos enviado un mail con un enlace para recuperar tu contraseña",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    await AuthService.resetPassword(token, password);
    res.status(200).json("Contraseña cambiada con exito");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
