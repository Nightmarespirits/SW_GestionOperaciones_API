import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import mainRoutes from './routes/mainRoutes.js';

const app = express()
//Contador de solicitudes http
let globalRequestsCounter = 0;
//Conectar DB
connectDB()

//Middlewares
app.use(express.json())

const ORIGIN_SITE = process.env.CORS_ALLOW_ACCESS
const corsOptions = {
    origin: ORIGIN_SITE, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
};

app.use(cors(corsOptions));

//Ruta principal
app.get('/', (req, res) => {
    globalRequestsCounter++
    res.send(`Welcome to SLC SW_GESTION_OPERACIONS_API for more info see the documentation /n globalRequestCounter: ${globalRequestsCounter}`)
})

//Rutas principales de la API
app.use('/api', mainRoutes);

//Manejador errores globales
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({message: 'Algo salio Mal!'})
})

//Inicializacion del servidor
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => { console.log(`Servidor corriendo en  el puerto http://localhost:${PORT}`) })