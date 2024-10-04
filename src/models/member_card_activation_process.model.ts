import { DataTypes, Model } from '@sequelize/core';
import { dbConnection } from '../DB/config';

class MemberCardActivationProcess extends Model {

    public id!: number;
    public member_id!: number;
    public status!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

MemberCardActivationProcess.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    member_id: {
        type: DataTypes.INTEGER
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
    tableName: 'member_card_activation_process'
});

export default MemberCardActivationProcess;