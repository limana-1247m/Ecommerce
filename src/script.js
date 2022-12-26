import express from 'express';

//CRIAR APP

const app = express();
app.use(express.json());

//app.post("/produtos", (req, res)=> {
   // const produto = (id,titulo,descricao,valor) = req.body
    //produtos.push(produto)
   // return res.status(201).json(produto)//
//});//

import db from "./database/configdb.js"
import { CreateTableUser, CreateTableProduct, CreateTableCart, enableForeignKey} from './database/createdatabase.js';

CreateTableUser(db)
CreateTableProduct(db)
CreateTableCart(db)
enableForeignKey(db)

import cartController from './controllers/carrinhoControllers.js';
cartController(app,db)

import productController from './controllers/produtoControllers.js';
productController(app,db)

import userController from './controllers/usuarioController.js';
userController (app,db)

//SERVIDOR RODANDO
export default app;



 