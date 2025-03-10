import express, {Router} from 'express';
import productsRouter from './routes/products';

const app = express()
const port = 3000

app.get('/', (req,res) => {
    res.send('Hola')
})

//product endpoints
app.use('/products', productsRouter);

app.listen(port,() => {
    console.log({port})
})