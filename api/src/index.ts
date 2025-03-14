import express, {json, urlencoded} from 'express';
import productsRouter from './routes/products/index.js';
import authRoutes from './routes/auth/index.js'
import serverless from 'serverless-http'


const app = express()
const port = 3000

app.use(json())
app.use(urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.send('Hola')
})

//product endpoints
app.use('/products', productsRouter);
app.use('/auth', authRoutes);

app.listen(port,() => {
    console.log({port})
})

export const handler = serverless(app);