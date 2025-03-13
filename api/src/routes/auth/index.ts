import { Router } from "express";
import { createUserSchema, loginSchema, usersTable } from "./../../db/usersSchema";
import { validateData } from "./../../middleware/validationMiddleware";
import {db} from '../../db'
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

router.post('/register', validateData(createUserSchema), async(req, res) => {
    try {
        const data = req.cleanBody;
        data.password = await bcrypt.hash(data.password,10)
        
        const [user] = await db.insert(usersTable)
            .values(data)
            .returning()

        //@ts-ignore
        delete user.password
    
        res.status(201).json({user})
    } catch (error) {
        res.status(500).send("Uoops something went wrong")
    }
})

router.post('/login', validateData(loginSchema), async (req, res) => {

    try {
        const {email, password} = req.cleanBody;

        const [user] = await db.select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
        
        if(!user) {
            res.status(401).json({error: 'Authentication failed'});
            return;
        }

        const match = await bcrypt.compare(password,user.password)
       

        if(!match) {
            res.status(401).json({error: 'Authentication failed'});
            return;
        }

        //create a Jwt token
        const token = jwt.sign({userId: user.id, role: user.role}, 'your-secret', {expiresIn: '30d'});
        
        //@ts-ignore
        delete user.password

        res.status(200).json({token, user})

    } catch (error) {
        
    }

    res.status(200)
})

export default router;
