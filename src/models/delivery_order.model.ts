import { DataTypes, Model } from '@sequelize/core';
import { dbConnection } from '../DB/config';

class DeliveryOrder extends Model {
    public id!: number;
    public public_id!: Buffer;
    public member_id!: number;
    public recipient_name!: string;
    public department_id!: number;
    public city!: string;
    public address!: string;
    public phone!: string;
    public domicile_type!: string;
    public additional_references!: string;
    public status!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

DeliveryOrder.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    public_id: {
        type: DataTypes.BLOB
    },
    member_id: {
        type: DataTypes.INTEGER
    },
    recipient_name: {
        type: DataTypes.STRING
    },
    department_id: {
        type: DataTypes.INTEGER
    },
    city: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    domicile_type: {
        type: DataTypes.STRING
    },
    additional_references: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    },
}, {
    sequelize: dbConnection,
    timestamps: false,
    tableName: 'delivery_order'
});

export default DeliveryOrder;