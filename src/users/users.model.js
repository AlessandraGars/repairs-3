import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";
import Repairs from "../repairs/repairs.model.js";

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'client'
    },
});

Users.hasMany(Repairs, { foreignKey: 'userId' }); // Users tiene muchas Repairs


export default Users;
