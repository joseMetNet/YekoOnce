import { Request, Response } from 'express';
import DeliveryOrderRepository from '../repository/delivery_order.repository';

export const createDeliveryOrder = async (req: Request, res: Response) => {
  try {
    const {
      member_id,
      recipient_name,
      department_id,
      city,
      address,
      phone,
      domicile_type,
      additional_references,
      status,
      created_at,
      updated_at
    } = req.body;

    const createdOrder = await DeliveryOrderRepository.createDeliveryOrder({
      member_id,
      recipient_name,
      department_id,
      city,
      address,
      phone,
      domicile_type,
      additional_references,
      status,
      created_at,
      updated_at
    });

    res.status(201).json(createdOrder);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
