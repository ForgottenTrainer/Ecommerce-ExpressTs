import {Router} from 'express'
import {listProducts, getProductById, createProduct, updateProduct, deleteProduct} from './productsController.js'
import { validateData } from '../../middleware/validationMiddleware.js'
import { createProductSchema, updateProductSchema} from './../../db/productsSchema.js'
import { verifySeller, verifyToken } from './../../middleware/authMiddleware.js'

/*const createProductSchema = z.object({
    name: z.string({message: "El nombre no debe estar vacio"}),
    price: z.number({message: "El precio debe ser un numero"}),
    quantity: z.number({message: "La cantidad debe ser un numero"})
})*/

const router = Router()

router.get('/', listProducts)
router.get('/:id', getProductById)
router.post('/', verifyToken, verifySeller,validateData(createProductSchema) ,createProduct)
router.put('/:id', verifyToken, verifySeller, validateData(updateProductSchema), updateProduct);
router.delete('/:id', verifyToken, verifySeller, deleteProduct)

export default router