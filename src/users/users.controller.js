import User from './users.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Agregada importación de bcrypt
import { validationResult } from 'express-validator';

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ where: { status: 'active' } }); // Filtra por usuarios activos
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id, status: 'active' } }); // Filtra por usuarios activos
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // ... Validación de campos y creación de usuario

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findOne({ where: { id, status: 'active' } }); // Filtra por usuarios activos
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserInfo = async (req, res) => {
    try {
        // Suponemos que el usuario se autentica y su información está disponible en req.user
        const user = req.user;

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Aquí puedes seleccionar los campos que desees devolver en la respuesta
        const userInfo = {
            name: user.name,
            email: user.email,
            role: user.role,
            // Otros campos que quieras incluir
        };

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id, status: 'active' } }); // Filtra por usuarios activos
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        user.status = 'disabled';

        await user.save();
        res.status(200).json({ message: 'Cuenta de usuario deshabilitada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Busca al usuario por su correo electrónico
        const user = await User.findOne({ where: { email, status: 'active' } }); // Filtra por usuarios activos

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verifica la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Si las credenciales son válidas, genera un token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Cambia la duración del token según tus necesidades
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


