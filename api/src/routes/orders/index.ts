import {Router} from 'express'
import { createOrder } from './ordersController.js'
import { validateData } from './../../middleware/validationMiddleware.js'
import { insertOrderWithItemsSchema } from './../../db/ordersSchema.js'
import { verifyToken } from './../../middleware/authMiddleware.js'


const router = Router()

router.post('/', verifyToken ,validateData(insertOrderWithItemsSchema), createOrder)

export default router