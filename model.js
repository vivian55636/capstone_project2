require ('dotenv').config ();
const { sequelize, DataTypes, Model } = require ('sequelize');

// Create a new sequelize instance with environmental variables;
const sequelize = new sequelize (process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
        },
    },
});

// Define the model for the users table;
class User extends Model {};
User.init ({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'users',
    timestamps: false,
});

module.exports = { User };