import { DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD, DB_DIALECT} from "../config/db.config.js";
import { Sequelize } from "sequelize";
import  * as _pool  from "sequelize";



const sequelize = new Sequelize ( `${DB_DATABASE}`, `${DB_USER}`, `${DB_PASSWORD}`, {
    host : DB_HOST,
    dialect : `${DB_DIALECT}`, 

    PoolOptions: {
        max: _pool.max,
        min: _pool.min,
        acquire: _pool.acquire,
        idle: _pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import User from './user.model.js';
db.user = User(sequelize, Sequelize)

import Role from './role.model.js';
db.role = Role(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  
  db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
  
  db.ROLES = ["user", "admin", "moderator"];
  
export default db;
