import { RepairsService } from "./repairs.service.js";
import Users from '../users/users.model.js';
import { AppError } from './path/to/errorHandler';

const repairsService = new RepairsService();

export const getRepairs = async (req, res) => {
    try {
        const repairs = await Repairs.findAll({ where: { status: 'pending' } });
        res.status(200).json(repairs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRepairById = async (req, res) => {
    const { id } = req.params;
    try {
        const repair = await Repairs.findByPk(id);
        if (!repair) {
            return res.status(404).json({ error: 'Reparación no encontrada' });
        }
        res.status(200).json(repair);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createRepairs = async (req, res, next) => {
    try {
        // ... lógica para crear una reparación
        // Si ocurre un error en la lógica, lánzalo como un AppError personalizado
        if (errorOccurred) {
            throw new AppError('Mensaje de error personalizado', 400);
        }

        // Si no hay error, continúa con la respuesta exitosa
        res.status(201).json({ message: 'Reparación creada exitosamente' });
    } catch (error) {
        // Cualquier error capturado se manejará en el middleware global de manejo de errores
        next(error);
    }
}

export const updateRepairsStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const repair = await repairsService.updateRepairStatus(id, status);
        res.json(repair);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteRepairs = async (req, res) => {
    try {
        const repairId = req.params.id;

        // Busca la reparación por ID
        const repair = await Repairs.findByPk(repairId);

        if (!repair) {
            return res.status(404).json({ error: 'Reparación no encontrada' });
        }

        // Verifica si la reparación está en estado "completed"
        if (repair.status === 'completed') {
            return res.status(400).json({ error: 'No se puede cancelar una reparación completada' });
        }

        // Elimina la reparación de la base de datos
        await repair.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPendingRepairs = async (req, res) => {
    try {
        const pendingRepairs = await Repairs.findAll({
            where: { status: 'pending' },
            include: [{ model: Users, attributes: ['name', 'email'] }]
        });

        res.status(200).json(pendingRepairs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCompletedRepairs = async (req, res) => {
    try {
        const completedRepairs = await Repairs.findAll({
            where: { status: 'completed' },
            include: [{ model: Users, attributes: ['name', 'email'] }]
        });

        res.status(200).json(completedRepairs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
