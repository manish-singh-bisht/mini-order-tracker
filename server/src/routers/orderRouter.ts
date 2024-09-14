import express from "express";
import { getOrders } from "../controllers/orderController.js";
import { checkSchema } from "express-validator";
import { getOrdersValidationSchema } from "../utils/validations.js";

const router = express.Router();

router.get("/orders", checkSchema(getOrdersValidationSchema), getOrders);

export default router;
