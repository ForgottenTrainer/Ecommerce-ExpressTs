import {Router} from 'express'
const router = Router()

router.get('/', (req, res) => {
    res.send('List products')
})

router.post('/',(req,res) => {
    res.send('Was created')
})

router.get('/:id',(req,res) => {
    console.log(req.params)
    res.send('A products')
})

export default router