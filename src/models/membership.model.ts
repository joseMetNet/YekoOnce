import { DataTypes, Model } from '@sequelize/core';
import { dbConnection } from '../DB/config';

class Membership extends Model {
  public id!: number;
  public public_id!: Buffer;
  public member_id!: number;
  public card_id!: number;
  public created_at?: Date;
  public updated_at?: Date;
}

Membership.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  public_id: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  card_id: {
    type: DataTypes.INTEGER,
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
  timestamps: false,
  tableName: 'membership',
});

export default Membership;
