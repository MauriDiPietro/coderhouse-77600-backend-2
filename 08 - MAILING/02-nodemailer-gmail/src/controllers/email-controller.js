import { sendEmailService, sendEmailServiceHBS } from "../services/email-service.js";

export const sendEmailController = async (req, res, next) => {
  try {
    const { name, dest } = req.body;
    const response = await sendEmailService(name, dest);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const sendEmailControllerHBS = async (req, res, next) => {
  try {
    const { name, dest } = req.body;
    const response = await sendEmailServiceHBS(name, dest);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
