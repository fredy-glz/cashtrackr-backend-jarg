import { Router } from "express";

import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import {
  validateBudgeExists,
  validateBudgeId,
  validateBudgetInput,
} from "../middleware/budget";

const router = Router();

// Middleware para validar el id que se pasa como parametro en cada endpoint
router.param("budgetId", validateBudgeId);
router.param("budgetId", validateBudgeExists);

router.get("/", BudgetController.getAll);

router.post(
  "/",
  validateBudgetInput,
  handleInputErrors,
  BudgetController.create
);

router.get("/:budgetId", BudgetController.getById);

router.put(
  "/:budgetId",
  validateBudgetInput,
  handleInputErrors,
  BudgetController.updateById
);

router.delete("/:budgetId", BudgetController.deleteById);

export default router;
