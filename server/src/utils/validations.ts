import { Schema } from "express-validator";

export const getOrdersValidationSchema: Schema = {
  customerId: {
    in: ["query"],
    notEmpty: {
      errorMessage: "Customer ID is required",
    },
    isUUID: {
      errorMessage: "Invalid Customer ID format",
    },
  },
  page: {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Page must be a positive integer",
    },
    toInt: true,
  },
  limit: {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Limit must be a positive integer",
    },
    toInt: true,
  },
  status: {
    in: ["query"],
    optional: true,
    isIn: {
      options: [["PENDING", "FULFILLED", "CANCELLED", "FAILED"]],
      errorMessage:
        "Status must be one of PENDING, FULFILLED,FAILED, or CANCELLED",
    },
    trim: true,
  },
};
