import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";
import Users from "../users/users.model.js";

const Repairs = sequelize.define('Repairs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users, // Utiliza la instancia del modelo Users
            key: 'id'
        }
    },
    // Agrega la columna deletedAt para el "soft delete"
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
});

Repairs.belongsTo(Users, { foreignKey: 'userId' });

export default Repairs;
