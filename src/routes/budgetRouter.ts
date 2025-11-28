import { Router } from "express";

import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import {
  hasAccess,
  validateBudgeExists,
  validateBudgeId,
  validateBudgetInput,
} from "../middleware/budget";
import { ExpenseController } from "../controllers/ExpenseController";
import {
  validateExpenseExists,
  validateExpenseId,
  validateExpenseInput,
} from "../middleware/expense";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

// Middleware para validar el id que se pasa como parametro en cada endpoint
router.param("budgetId", validateBudgeId);
router.param("budgetId", validateBudgeExists);
router.param("budgetId", hasAccess);

router.param("expenseId", validateExpenseId);
router.param("expenseId", validateExpenseExists);

// Routes for budgets
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

// Routes for expenses
router.post(
  "/:budgetId/expenses",
  validateExpenseInput,
  handleInputErrors,
  ExpenseController.create
);
router.get("/:budgetId/expenses/:expenseId", ExpenseController.getById);
router.put(
  "/:budgetId/expenses/:expenseId",
  validateExpenseInput,
  handleInputErrors,
  ExpenseController.updateById
);
router.delete("/:budgetId/expenses/:expenseId", ExpenseController.deleteById);

export default router;
