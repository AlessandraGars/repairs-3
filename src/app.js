import express from "express";
import { router as repairsRouter } from "./repairs/repairs.route.js";
import { userRouter } from "./users/users.route.js";
import dotenv from 'dotenv'; // Importa dotenv
import { globalErrorHandler } from './utils/globalErrorHandler.js'; // Importa el manejador de errores global
import catchAsync from './utils/catchAsync.js'; // Importa catchAsync

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();

app.use(express.json());

// Rutas para reparaciones
app.use('/api/v1/repairs', catchAsync(repairsRouter));

// Rutas para usuarios
app.use('/api/v1/users', catchAsync(userRouter));

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
});

// Manejo de errores global
app.use(globalErrorHandler);

export default app;
