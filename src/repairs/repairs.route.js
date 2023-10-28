import express from 'express';
import { validatePendingServiceExistence } from '../middlewares/repairMiddleware.js';
import { createRepairs, deleteRepairs, getRepairById, getRepairs, updateRepairsStatus } from './repairs.controller.js';

export const router = express.Router();

router.get("/", getRepairs);            // Obtener la lista de motos pendientes (pending) de reparar
router.get("/:id", validatePendingServiceExistence, getRepairById);       // Obtener una moto pendiente de reparar por su id
router.post("/", createRepairs);        // Crear una cita
router.patch("/:id", validatePendingServiceExistence, updateRepairsStatus); // Actualizar el status de una reparación a completado
router.delete("/:id", validatePendingServiceExistence, deleteRepairs);    // Cancelar la reparación de un usuario
