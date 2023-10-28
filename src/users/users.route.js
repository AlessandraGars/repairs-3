import express from 'express';
import { validateUserExistence } from '../middlewares/userMiddleware.js';
import { createUser, updateUser, deleteUser, getUserById, getUsers } from './users.controller.js';
import { authorizeUser } from '../middlewares/authMiddleware.js'; // Importa el middleware

export const userRouter = express.Router();

userRouter.get("/", getUsers);          // Obtener la lista de usuarios en la base de datos
userRouter.get("/:id", validateUserExistence, getUserById);     // Obtener un solo usuario dado un id
userRouter.post("/register", createUser);  // Crear un nuevo usuario
userRouter.patch("/:id", validateUserExistence, updateUser);    // Actualizar los datos de un usuario dado un id, solo puede actualizar su name y email
userRouter.delete("/:id", validateUserExistence, deleteUser);   // Deshabilitar la cuenta de un usuario, cambiar status a disabled

// Ruta para actualizar datos de usuario
router.patch('/:id', authorizeUser, async (req, res) => {
    // Esta ruta solo se puede acceder si el usuario actual es el propietario de la cuenta
    // Tu lógica de actualización de usuario aquí
});

// Ruta para deshabilitar la cuenta de usuario
router.delete('/:id', authorizeUser, async (req, res) => {
    // Esta ruta solo se puede acceder si el usuario actual es el propietario de la cuenta
    // Tu lógica para deshabilitar la cuenta aquí
});
