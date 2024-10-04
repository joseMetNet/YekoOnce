import { Request, Response } from 'express';
import moment from 'moment-timezone';
import { UniqueConstraintError } from 'sequelize';
import member_kouponsRepository from '../repository/member_koupons.repository';

export const createMemberKoupon = async (req: Request, res: Response) => {
  try {
    const { member_id, member_uuid, koupon_uuid, koupon_id, koupon_value_id, external_reference_id } = req.body;
    
    const currentDate = moment().tz('America/Bogota').toDate();

    const memberKouponData = {
      member_id,
      koupon_id,
      member_uuid,
      koupon_uuid,
      koupon_value_id,
      external_reference_id: external_reference_id || '',
      created_at: currentDate,
      updated_at: currentDate,
    };

    const newMemberKoupon = await member_kouponsRepository.createMemberKoupon(memberKouponData);

    res.status(201).json(newMemberKoupon);
  } catch (error: any) {
    if (error instanceof UniqueConstraintError) {
      res.status(400).json({ message: 'Duplicate entry found for a unique field.' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
