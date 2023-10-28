import Repair from '../repairs/repairs.model';

export const validatePendingServiceExistence = async (req, res, next) => {
    const { serviceId } = req.params;

    try {
        const service = await Repair.findByPk(serviceId);

        if (!service || service.status !== 'pending') {
            return res.status(404).json({ error: 'Servicio pendiente no encontrado' });
        }

        // Agrega el servicio pendiente al objeto de solicitud para su uso posterior.
        req.service = service;

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
