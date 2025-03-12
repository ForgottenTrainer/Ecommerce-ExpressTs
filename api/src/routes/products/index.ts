import {Router} from 'express'
import {listProducts, getProductById, createProduct, updateProduct, deleteProduct} from './productsController'
import { validateData } from '../../middleware/validationMiddleware'
import { createProductSchema, updateProductSchema} from './../../db/productsSchema'

/*const createProductSchema = z.object({
    name: z.string({message: "El nombre no debe estar vacio"}),
    price: z.number({message: "El precio debe ser un numero"}),
    quantity: z.number({message: "La cantidad debe ser un numero"})
})*/

const router = Router()

router.get('/', listProducts)
router.get('/:id', getProductById)
router.post('/', validateData(createProductSchema) ,createProduct)
router.put('/:id',validateData(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct)

export default router