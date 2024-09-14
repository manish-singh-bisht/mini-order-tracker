import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { matchedData, validationResult } from "express-validator";
import { GetOrdersParams, GetOrdersQuery } from "../utils/types/index.js";
import { OrderStatus } from "@prisma/client";

/**
 * Fetches orders.
 
 * It accepts `customerId` as a required query parameter and can optionally
 * take `page`, `limit`, and `status` as query parameters.
 *
 * @param {string} customerId - The ID of the customer whose orders are to be fetched (required).
 * @param {number} [page=1] - The page number for pagination (optional, default is 1).
 * @param {number} [limit=10] - The number of results per page (optional, default is 10).
 * @param {"PENDING" | "CANCELLED" | "FULFILLED" | "FAILED"} [status] - The status of the orders to filter by (optional).
 *
 * @returns {Promise<Pagination<Order[]>>} A promise that resolves to an array of `Order` objects.
 * @throws {Error} If the fetch request fails or returns a non-200 HTTP status code, an error will be thrown.
 * **/

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
    const skip = (page - 1) * limit;

    const customer = await prisma.customer.findUnique({
      where: { email: email },
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
      prisma.order.count({
        where: orderWhereClause,
      }),
      prisma.order.findMany({
        where: orderWhereClause,
        skip,
        take: limit,
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true,
            },
          }, //calling order items for future use.
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

    const totalPages = Math.ceil(totalOrdersCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return res.status(200).json({
      orders,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
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
