import { Request,Response } from "express"

export function listProducts(req:Request,res:Response) {
    res.send('List products 123')
}

export function getProductById(req:Request,res:Response) {
    res.send('ID 123')
}

export function createProduct(req:Request,res:Response) {
    res.send('Created')
}

export function updateProduct(req:Request,res:Response) {
    res.send('Updated')
}

export function deleteProduct(req:Request,res:Response) {
    res.send('Deleted')
}