import express from 'express'
import {scan} from './scanPage'
import cors from 'cors'

const app = express();

app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/api/:valor', async (req,res) =>{
    try{
        const value = req.params.valor;
        const resultado = await scan(value);
        res.json(resultado)
        console.log(resultado)
    } catch(error){
        console.log(error)
    }
})

app.listen(3030, () => {
    console.log('Servidor UP')
})