import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auht";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Prevenir duplicados
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      const error = new Error("Un usuario con ese email ya esta registrado");
      res.status(409).json({ error: error.message });
      return;
    }

    try {
      const user = new User(req.body);
      user.password = await hashPassword(password);
      user.token = generateToken();
      await user.save();

      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token,
      });

      res.json("Cuenta Creada Correctamente");
    } catch (error) {
      //   console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
