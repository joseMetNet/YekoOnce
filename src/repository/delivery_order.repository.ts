import { dbConnection } from '../DB/config';
import { IDeliveryOrderData } from '../interface/delivery_order.interface';
import { QueryTypes } from '@sequelize/core';
import { v4 as uuidv4 } from 'uuid';

class DeliveryOrderRepository {
  async createDeliveryOrder(data: Omit<IDeliveryOrderData, 'public_id'>): Promise<any> {
    try {
      const publicId = uuidv4(); 
      const publicIdBuffer = Buffer.from(publicId.replace(/-/g, ''), 'hex');
      console.log(publicIdBuffer.length);

      const [insertResult]: any = await dbConnection.query(
        `INSERT INTO shop.delivery_order 
        (public_id, member_id, recipient_name, department_id, city, address, phone, domicile_type, additional_references, status, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'created', NOW(), NOW())`,
        {
          replacements: [publicIdBuffer, data.member_id, data.recipient_name, data.department_id, data.city, data.address, data.phone, data.domicile_type, data.additional_references],
          type: QueryTypes.INSERT,
        }
      );

      console.log(insertResult);

      const newOrderId = insertResult.insertId || insertResult; 
      if (!newOrderId) {
        throw new Error('Error al crear la orden de entrega. ID no generado.');
      }

      const [createdOrder]: any = await dbConnection.query(
        `SELECT * FROM shop.delivery_order WHERE id = ?`,
        {
          replacements: [newOrderId],
          type: QueryTypes.SELECT,
        }
      );

      if (!createdOrder) {
        throw new Error('No se encontró el registro de la orden de entrega recién creado.');
      }

      return createdOrder;
    } catch (error: any) {
      throw new Error(`Error al crear la orden de entrega: ${error.message}`);
    }
  }
}

export default new DeliveryOrderRepository();
