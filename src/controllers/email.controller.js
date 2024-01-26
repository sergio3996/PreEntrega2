import EmailService from "../services/email.service.js";

export const sendEmail = async (req, res) => {
  try {
    const result = await EmailService.sendMail(
      "sergio3996@gmail.com",
      "Hola 😁",
      "<h1>Coder House</h1>"
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
