import { DataTypes, Model } from '@sequelize/core';
import { dbConnection } from '../DB/config';

class Card extends Model {
  public id!: number;
  public card_id!: string;
  public agreement_id!: string;
  public number!: string;
  public code!: string;
  public edition!: string;
  public status!: string;
  public expires_at!: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

Card.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  card_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  agreement_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: dbConnection,
  tableName: 'card',
  timestamps: false,
});

export default Card;