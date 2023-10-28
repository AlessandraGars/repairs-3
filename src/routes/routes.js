import express from 'express';
import { router as repairsRouter } from '../repairs/repairs.route.js'; // Importa las rutas de reparaciones
import { userRouter } from '../users/users.route.js'; // Importa las rutas de usuarios

export const router = express.Router();

// Configura las rutas para reparaciones
router.use('/repairs', repairsRouter);

// Configura las rutas para usuarios
router.use('/users', userRouter);

export default router;