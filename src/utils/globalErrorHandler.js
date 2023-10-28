const handleCastErrorDB = (err) => {
    const message = `Valor inválido para el campo ${err.path}: ${err.value}.`;
    return new AppError(message, 400); // 400 significa "Solicitud incorrecta" en HTTP
};

const handleDuplicateFieldsDB = (err) => {
    const message = `Ya existe un registro con el valor "${err.keyValue.name}" en el campo "${err.key}"`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Datos de entrada inválidos. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    // Errores operacionales confiables: envía detalles al cliente
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Errores de programación u otros errores desconocidos: no reveles detalles al cliente
        console.error('Error inesperado:', err);
        res.status(500).json({
            status: 'error',
            message: 'Algo salió mal.',
        });
    }
};

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        const error = { ...err };
        error.message = err.message;

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

        sendErrorProd(error, res);
    }
};


export default globalErrorHandler;
