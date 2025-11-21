import type { Request, Response } from "express";
import Budget from "../models/Budget";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [["createdAt", "DESC"]],
        // limit: 1
        // where: {
        //   name: 'Graduación'
        // }

        // TODO: Filtrar por el usuario autenticado
      });

      res.json(budgets);
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const budgets = new Budget(req.body);
      await budgets.save();
      res.status(201).json("Presupuesto Creado Correctamente");
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    res.json(req.budget);
  };

  static updateById = async (req: Request, res: Response) => {
    await req.budget.update(req.body);
    res.json("Presupuesto actualizado correctamente");
  };

  static deleteById = async (req: Request, res: Response) => {
    await req.budget.destroy();
    res.json("Presupuesto eliminado correctamente");
  };
}
