import express from 'express';
import { validateUserExistence } from '../middlewares/userMiddleware.js';
import {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsers
} from './users.controller.js';
import catchAsync from '../utils/catchAsync'; // Importa catchAsync desde tu archivo de utilidades

export const userRouter = express.Router();

userRouter.get('/', catchAsync(getUsers));
userRouter.get('/:id', validateUserExistence, catchAsync(getUserById));
userRouter.post('/register', catchAsync(createUser));
userRouter.patch('/:id', validateUserExistence, catchAsync(updateUser));
userRouter.delete('/:id', validateUserExistence, catchAsync(deleteUser));
