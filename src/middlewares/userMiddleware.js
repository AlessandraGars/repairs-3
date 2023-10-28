import User from '../users/users.model';

export const validateUserExistence = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Agrega el usuario al objeto de solicitud para que esté disponible en las rutas.
        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
