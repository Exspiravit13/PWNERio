import { Sequelize } from "sequelize"

export const HOST = "localhost"
export const PORT = "3306"
export const USER = "testuser"
export const PASSWORD = "testpassword"
export const DB = "mysql"
export const dialect = "mysql"
    export const pool = {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    };

export default Sequelize


