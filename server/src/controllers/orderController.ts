import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { matchedData, validationResult } from "express-validator";
import { GetOrdersParams, GetOrdersQuery } from "../utils/types/index.js";
import { OrderStatus } from "@prisma/client";

/**
 * Fetches orders for a specific customer based on email.
 *
 * @param {string} email - Required query parameter for customer email.
 * @param {number} [page=1] -Optional Page number for pagination (default is 1).
 * @param {number} [limit=10] -Optional Number of results per page (default is 10, max is 100).
 * @param {"PENDING" | "CANCELLED" | "FULFILLED" | "FAILED"} [status] - Optional order status filter.
 **/
export const getOrders = async (
  req: Request<GetOrdersParams, {}, {}, GetOrdersQuery>,
  res: Response
) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { page = 1, limit = 10, email, status } = matchedData(req);

    const sPage = Math.max(page, 1);
    const sLimit = Math.min(limit, 100);
    const skip = (sPage - 1) * sLimit;

    const customer = await prisma.customer.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const orderWhereClause: { customerId: string; status?: OrderStatus } = {
      customerId: customer.id,
    };
    if (status) {
      orderWhereClause.status = status;
    }

    const [totalOrdersCount, orders] = await Promise.all([
      prisma.order.count({ where: orderWhereClause }),
      prisma.order.findMany({
        where: orderWhereClause,
        skip,
        take: sLimit,
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          orderItems: {
            include: {
              product: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
        orderBy: {
          orderDate: "desc",
        },
      }),
    ]);

    const totalPages = Math.ceil(totalOrdersCount / sLimit);
    const hasNextPage = sPage < totalPages;
    const hasPreviousPage = sPage > 1;

    return res.status(200).json({
      orders,
      pagination: {
        currentPage: sPage,
        itemsPerPage: sLimit,
        hasNextPage,
        hasPreviousPage,
        totalOrdersCount,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
