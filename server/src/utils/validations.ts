import { Schema } from "express-validator";

export const getOrdersValidationSchema: Schema = {
  email: {
    in: ["query"],
    notEmpty: {
      errorMessage: "Customer email is required",
    },
    isEmail: {
      errorMessage: "Invalid email format",
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
