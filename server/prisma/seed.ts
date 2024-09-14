// import { PrismaClient, OrderStatus, ShippingMethod } from "@prisma/client";
// import { faker } from "@faker-js/faker";

// const prisma = new PrismaClient();

// async function main() {
//   // Create 5 products
//   const products = await Promise.all(
//     Array.from({ length: 5 }).map(() =>
//       prisma.product.create({
//         data: {
//           name: faker.commerce.productName(),
//           description: faker.commerce.productDescription(),
//           price: parseFloat(faker.commerce.price()),
//         },
//       })
//     )
//   );

//   // Create 1 customer
//   const customer = await prisma.customer.create({
//     data: {
//       firstName: faker.person.firstName(),
//       lastName: faker.person.lastName(),
//       address: faker.location.streetAddress(),
//       email: faker.internet.email(),
//       phone: faker.phone.number(),
//     },
//   });

//   // Create 20 orders for the single customer
//   for (let i = 0; i < 20; i++) {
//     const orderItemsCount = faker.number.int({ min: 1, max: 3 });
//     const orderItems = Array.from({ length: orderItemsCount }).map(() => {
//       const product = faker.helpers.arrayElement(products);
//       const quantity = faker.number.int({ min: 1, max: 5 });
//       return {
//         product: { connect: { id: product.id } },
//         quantity,
//         unitPrice: product.price,
//       };
//     });

//     const totalAmount = orderItems.reduce(
//       (sum, item) => sum + item.quantity * item.unitPrice,
//       0
//     );

//     await prisma.order.create({
//       data: {
//         customer: { connect: { id: customer.id } },
//         orderDate: faker.date.past(),
//         totalAmount,
//         status: faker.helpers.arrayElement(Object.values(OrderStatus)),
//         shippingMethod: faker.helpers.arrayElement(
//           Object.values(ShippingMethod)
//         ),
//         shippingAddress: faker.location.streetAddress(),
//         orderItems: {
//           create: orderItems,
//         },
//       },
//     });
//   }

//   console.log("Seeding completed successfully");
//   console.log(`Created 1 customer with ID: ${customer.id}`);
//   console.log(`Created 20 orders for the customer`);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
