import prisma from "../../../lib/prisma";

export const cashPayment = async (req: any, res: any) => {
  try {
    const getUser = req.user;
    const userIdOrganization = getUser.organizationId;

    const { orderNumber, recievedCash } = req.body;

    if (orderNumber === undefined || recievedCash === undefined) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    if (recievedCash <= 0) {
      return res.status(400).json({
        message: "Invalid cash amount",
      });
    }

    const findOrder = await prisma.order.findFirst({
      where: {
        orderNumber: orderNumber,
        status: "WAITING_PAYMENT",
        OrganizationId: userIdOrganization,
      },
    });

    if (!findOrder) {
      return res.status(400).json({
        message: "Can't find your order",
      });
    }

    if (recievedCash < findOrder.total) {
      return res.status(400).json({
        message: "Not enough nominal input",
      });
    }

    const returnedCash = recievedCash - findOrder.total;

    await prisma.$transaction(async (tx) => {
      const updatePayment = await tx.payment.update({
        where: {
          orderId: findOrder.id,
        },
        data: {
          cashReceived: recievedCash,
          cashReturned: returnedCash,
          status: "SUCCESS",
        },
      });

      const updateOrder = await tx.order.update({
        where: {
          id: findOrder.id,
        },
        data: {
          status: "PAID",
        },
      });
    });

    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// export const cashPayment = async(req: any, res:any) => {
//     try {

//         const {orderNumber, recievedCash, paymentId, paymentMethod} = req.body;

//         if(!orderNumber || !paymentId || !paymentMethod) {
//             return res.status(400).json({
//                 message : "Missing required field"
//             })
//         }

//         const getUser = req.user;
//         const getUserOrganizationId =  getUser.organizationId

//         const findOrder = await prisma.order.findFirst({
//             where : {
//                 orderNumber : orderNumber,
//                 OrganizationId : getUserOrganizationId,
//                 status : "WAITING_PAYMENT"
//             }
//         })

//         if(!findOrder) {
//             return res.status(400).json({
//                 message : "Internal server error"
//             })
//         }

//         const findPayment = await prisma.payment.findFirst({
//             where : {
//                 id : paymentId,
//                 orderNum : orderNumber,
//                 status : "PENDING"

//             }
//         })

//         if(!findPayment) {
//             return res.status(400).json({
//                 message : "Internal server error"
//             })
//         }

//         switch (paymentMethod) {
//             case "CASH":

//                 if(!recievedCash || recievedCash < findOrder.total) {
//                     return res.status(400).json({
//                 message : "Not enough recived cash"
//             })
//                 }

//                 const returnedCash = recievedCash - findOrder.total

//                 const cashPayment = await prisma.payment.create({
//                     data : {
//                         orderNum : findOrder.orderNumber,
//                         method : "TUNAI",
//                         amount : findOrder.total,
//                         cashReceived : recievedCash,
//                         cashReturned : returnedCash,
//                         status : "SUCCESS"
//                     }
//                 })

//                 if(!cashPayment) {
//                     return res.status(400).json({
//                         message : "Internal server error"
//                     })
//                 }

//                 const updateOrder = await prisma.order.update({
//                     where: {
//                         id: findOrder.id
//                     },
//                     data: {
//                         status : "PAID"
//                     }
//                 })

//                 break;

//             case "QRIS" :

//                 const generateQRIS = await generateQRISPayment(findOrder.id, recievedCash)
//                 if(generateQRIS.statusCode != 200) {
//                     return res.status(400).json({
//                         message : "Internal server error"
//                     })
//                 }

//                 const updateQRISPayment = await prisma.payment.update({
//                     where : {
//                         id : findPayment.id,
//                         orderNum : findPayment.orderNum,
//                         method : findPayment.method,
//                         amount : findPayment.amount,
//                         status : "PENDING"
//                     },
//                     data : {
//                         status : "SUCCESS"
//                     }
//                 })

//                 const updateQrderPayment = await prisma.order.update({
//                     where : {
//                         orderNumber : findOrder.orderNumber
//                     },
//                     data : {
//                         status : "PAID"
//                     }
//                 })

//                 break

//             default:
//                 break;
//         }

//         return res.status(200).json({
//             message : "Success"
//         })

//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({
//             message : "Internal server error"
//         })
//     }
// }errorerrorerrorIIII
