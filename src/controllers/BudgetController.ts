import type { Request, Response } from "express";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [["createdAt", "DESC"]],
        // limit: 1
        // where: {
        //   name: 'Graduación'
        // }

        // Filtrar por el usuario autenticado
        where: {
          userId: req.user.id,
        },
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
      budgets.userId = req.user.id;
      await budgets.save();
      res.status(201).json("Presupuesto Creado Correctamente");
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const budget = await Budget.findByPk(req.budget.id, { include: [Expense] });

    res.json(budget);
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
