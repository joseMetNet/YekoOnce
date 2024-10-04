import { DataTypes, Model } from '@sequelize/core';
import { dbConnection } from '../DB/config';

class Abonado extends Model {
    public id!: number;
    public identification!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Abonado.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    identification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    sequelize: dbConnection,
    tableName: 'abonado',
    timestamps: false,
});

export default Abonado;