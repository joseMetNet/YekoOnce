import { DataTypes, Model } from '@sequelize/core';
import { dbConnection } from '../DB/config';
import moment from 'moment-timezone';

class Member extends Model {
  public id!: number;
  public member_id!: Buffer;
  public agreement_id!: Buffer;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public gender!: string;
  public identification!: string;
  public birthdate!: Date;
  public preferred_department_id!: Buffer;
  public activation_ip!: string;
  public created_at?: Date;
  public updated_at?: Date;
}

Member.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  agreement_id: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  preferred_department_id: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  activation_ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: () => moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss'),
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: () => moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss'),
  },
}, {
  sequelize: dbConnection,
  timestamps: false,
  tableName: 'member',
});

export default Member;
