import express from "express";
import cors from "cors";
import joi from "joi";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/list", async (req,res)=>{
    try{
        const list = await connection.query(`SELECT * from infos`);
        res.send(list.rows);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

app.post("/list", async (req,res)=>{
    const {text} = req.body
    const textSchema = joi.object({
        text: joi.string().min(1).required()
    })
    const value = textSchema.validate({text: text});
    if(value.error){
        res.sendStatus(400);
        return
    }
    try{
        await connection.query(`INSERT INTO infos (list) VALUES ($1)`, [text]);
        res.sendStatus(201);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

export default app;

