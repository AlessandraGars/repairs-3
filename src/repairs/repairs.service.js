import Repairs from "./repairs.model.js";

export class RepairsService {
    async createRepair(date, userId) {
        try {
            const repair = await Repairs.create({ date, userId });
            return repair;
        } catch (error) {
            throw error;
        }
    }

    async updateRepairStatus(id, newStatus) {
        try {
            const repair = await Repairs.findByPk(id);
            if (!repair) {
                throw new Error('Reparación no encontrada');
            }
            repair.status = newStatus;
            await repair.save();
            return repair;
        } catch (error) {
            throw error;
        }
    }

    async deleteRepair(id) {
        try {
            const repair = await Repairs.findByPk(id);
            if (!repair) {
                throw new Error('Reparación no encontrada');
            }
            await repair.destroy();
        } catch (error) {
            throw error;
        }
    }
}
