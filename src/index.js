const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect('mongodb+srv://week10:week10@omnistack-kjfh0.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,    
    useUnifiedTopology: true
});


app.use(express.json())

// METODOS HTTP: GET, POST, PUT ,DELETE ... 

// TIPOS DE PARÂMETROS: 
    // Query Params: req.query (filtros, ordenação, paginação, ... );
    // Route Params: req.params (Identificar um recurso na alteração ou remoção);
    // body : req.body (dados para criação ou edição de um registro);

app.post('/users', (req,res)=> {
    console.log(req.body)
    return res.json(req.body)
    
})

app.get('/',(req,res)=> {
    return res.json({
        msg: "Hello Lázaro P"
    })
})



app.listen(3000, ()=> {
    console.log("SERVIDOR RUNNNIG")
})