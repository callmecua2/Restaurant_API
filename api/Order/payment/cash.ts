import prisma from "../../../lib/prisma";

export const cashPayment = async(req: any, res:any) => {
    try {
        
        const {orderNumber, recievedCash, paymentId, paymentMethod} = req.body;

        if(!orderNumber || paymentId || paymentMethod) {
            return res.status(400).json({
                message : "Missing required field"
            })
        }
        
        const getUser = req.user;
        const getUserOrganizationId =  getUser.organizationId


        const findOrder = await prisma.order.findFirst({
            where : {
                orderNumber : orderNumber,
                OrganizationId : getUserOrganizationId,
                status : "WAITING_PAYMENT"
            }
        })


        if(!findOrder) {
            return res.status(400).json({
                message : "Internal server error"
            })
        }

        const findPayment = await prisma.payment.findFirst({
            where : {
                id : paymentId,
                orderNum : orderNumber,
                status : "PENDING"
            }
        })

        if(!findPayment) {
            return res.status(400).json({
                message : "Internal server error"
            })
        }

        switch (paymentMethod) {
            case "CASH":

                if(!recievedCash) {
                    return res.status(400).json({
                message : "Internal server error"
            })
                }
                
                const returnedCash = recievedCash - findOrder.total
            
                const cashPayment = await prisma.payment.create({
                    data : {
                        orderNum : findOrder.orderNumber,
                        method : "TUNAI",
                        amount : findOrder.total,
                        cashReceived : recievedCash,
                        cashReturned : returnedCash,
                        status : "SUCCESS"
                    }
                })

                if(!cashPayment) {
                    return res.status(400).json({
                        message : "Internal server error"
                    })
                }

                const updateOrder = await prisma.order.update({
                    where: {
                        id: findOrder.id
                    },
                    data: {
                        status : "PAID"
                    }
                })

                break;
            
            case "QRIS" : 

                const updateQRISPayment = await prisma.payment.update({
                    where : {
                        id : findPayment.id,
                        orderNum : findPayment.orderNum,
                        method : findPayment.method,
                        amount : findPayment.amount,
                        status : "PENDING"
                    },
                    data : {
                        status : "SUCCESS"
                    }
                })

                const updateQrderPayment = await prisma.order.update({
                    where : {
                        orderNumber : findOrder.orderNumber
                    },
                    data : {
                        status : "PAID"
                    }
                })


                break

            default:
                break;
        }

        return res.status(200).json({
            message : "Success"
        })


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}