import prisma from "./prisma"

export const generateQRIS = async(req: any, res: any) => {
    try {
        const {orderId, amount} = req.body;
        
        if(!orderId || !amount) {
            return res.status(400).json({
                message : "Missing required field"
            })
        }


        const getUser = req.user;
        const userIdOrganization = getUser.organizationId;
        
        const findOrder = await prisma.order.findFirst({
            where : {
                id : userIdOrganization,
                orderNumber : orderId,
                status : "WAITING_PAYMENT"
            }
        })

        if(!findOrder) {
           return res.status(400).json({
                message : "Internal server error"
            })
        }

        if(amount < findOrder.total) {
            return res.status(400).json({
                message : "Not enough amount of total order"
            })
        }


        const createPayment = await prisma.payment.create({
            data : {
                orderNum : findOrder.orderNumber,
                method : "QRIS",
                amount : findOrder.total
            }
        })
        
        return res.status(200).json({
            message : "Success create payment",
            paymentData : createPayment
        })

    } catch (error) {
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}
