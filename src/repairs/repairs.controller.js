import { RepairsService } from "./repairs.service.js";

const repairsService = new RepairsService();

export const getRepairs = async (req, res) => {
    try {
        const repairs = await Repairs.findAll({
            where: { status: 'pending' }
        });
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

export const createRepairs = async (req, res) => {
    const { date, userId } = req.body;
    try {
        const repair = await repairsService.createRepair(date, userId);
        res.status(201).json(repair);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        const repair = await repair.findByPk(repairId);

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

