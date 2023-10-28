import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/enviroments/enviroments.js'; // Asegúrate de importar tu cadena secreta desde la configuración

export const authenticateEmployee = (req, res, next) => {
    const token = req.header('x-auth-token'); // Puedes ajustar el nombre del encabezado según tus preferencias

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // El token incluye información sobre el usuario

        if (req.user.role !== 'employee') {
            return res.status(403).json({ message: 'Acceso denegado. Rol no autorizado.' });
        }

        next(); // Usuario autenticado y con rol válido
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};
