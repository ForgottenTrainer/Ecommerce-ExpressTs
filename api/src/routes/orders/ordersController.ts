import { Request, Response } from "express";
import { db } from "./../../db/index.js";
import { ordersItemsTable, ordersTable } from "./../../db/ordersSchema.js";

export async function createOrder(req: Request, res: Response) {
    try {
        const {order, items} = req.cleanBody
        const userId = req.userId

        if(!userId) {
            res.status(400).json({error: 'invalid order data'})

        }

        const [newOrder] = await db
            .insert(ordersTable)
            // @ts-ignore
            .values({ userId: userId })
            .returning();

        //Validate products
        const orderItems = items.map((item:any) => ({
            ...item,
            orderId: newOrder.id
        }))
        const newOrderItems = await db
            .insert(ordersItemsTable)
            .values(orderItems)
            .returning();

        console.log(order)
        res.status(201).json({...newOrder, items: newOrderItems})
    } catch (error) {
        res.status(500).json({error: 'invalid data information'})
    }   
}