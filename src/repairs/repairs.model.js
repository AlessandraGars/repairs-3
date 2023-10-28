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
            model: 'Users', // Asegura que se refiera a la tabla Users
            key: 'id'
        }
    }
});

Repairs.belongsTo(Users, { foreignKey: 'userId' }); // Repairs pertenece a Users


export default Repairs;
