import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js';
import maquinaRoutes from './routes/maquinaRoutes.js';
import operacionRoutes from './routes/operacionRoutes.js'
import procesosRoutes from './routes/procesosRoutes.js'
import sedeRoutes from './routes/sedeRoutes.js'
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
//Rutas
app.get('/', (req, res) => {
    globalRequestsCounter++
    res.send(`Welcome to SLC SW_GESTION_OPERACIONS_API for more info see the documentation /n globalRequestCounter: ${globalRequestsCounter}`)
})
app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/empleado', empleadoRoutes)
app.use('/maquina', maquinaRoutes)
app.use('/operacion', operacionRoutes);
app.use('/procesos', procesosRoutes);
app.use('/sede', sedeRoutes)
//Manejador errores globales
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({message: 'Algo salio Mal!'})
})

/*Pausar inicializaicion de puerto para SERVERLESS*/
// const PORT = process.env.PORT || 2000;
// app.listen(PORT, () => { console.log(`Servidor corriendo en  el puerto ${PORT}`) })

//Exportar configuracion
export default app;