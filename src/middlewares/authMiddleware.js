// authMiddleware.js
export const authorizeUser = (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
    }
    next();
};
