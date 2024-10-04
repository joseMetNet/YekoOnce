import { DataTypes, Model } from '@sequelize/core';
import { dbConnection } from '../DB/config';
import moment from 'moment-timezone';

class Agreement extends Model {
  public id!: number;
  public agreement_id!: string;
  public name!: string;
  public subscription_requires_identification!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Agreement.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  agreement_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscription_requires_identification: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, {
  sequelize: dbConnection,
  tableName: 'agreement',
  timestamps: false,
});

export default Agreement;