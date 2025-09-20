import { sendEmailService } from "../services/email-service.js";

export const sendEmailController = async (req, res, next) => {
  try {
    const { name, dest } = req.body;
    const response = await sendEmailService(name, dest);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
