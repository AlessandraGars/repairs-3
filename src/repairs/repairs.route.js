import express from 'express';
import { validatePendingServiceExistence } from '../middlewares/repairMiddleware.js';
import {
    createRepairs,
    deleteRepairs,
    getRepairById,
    getRepairs,
    updateRepairsStatus,
    getPendingRepairs,
    getCompletedRepairs
} from './repairs.controller.js';
import catchAsync from '../utils/catchAsync'; // Importa catchAsync desde tu archivo de utilidades

export const router = express.Router();

router.get('/', catchAsync(getRepairs));
router.get('/:id', validatePendingServiceExistence, catchAsync(getRepairById));
router.post('/', catchAsync(createRepairs));
router.patch('/:id', validatePendingServiceExistence, catchAsync(updateRepairsStatus));
router.delete('/:id', validatePendingServiceExistence, catchAsync(deleteRepairs));
router.get('/pending', catchAsync(getPendingRepairs));
router.get('/completed', catchAsync(getCompletedRepairs));
