import { DataTypes, Model } from '@sequelize/core';
import { dbConnection } from '../DB/config';

class MemberKoupons extends Model {
    public id!: number;
    public member_id!: number;
    public koupon_id!: number;
    public koupon_value_id!: number;
    public external_reference_id!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

MemberKoupons.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    member_id: {
        type: DataTypes.INTEGER
    },
    koupon_id: {
        type: DataTypes.INTEGER
    },
    koupon_value_id: {
        type: DataTypes.INTEGER
    },
    external_reference_id: {
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
    tableName: 'member_koupons',
    timestamps: false
});

export default MemberKoupons;