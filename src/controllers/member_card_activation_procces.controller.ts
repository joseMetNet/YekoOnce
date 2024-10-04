import { Request, Response } from 'express';
import MemberCardActivationProcessRepository from '../repository/member_card_activation_process.repository';

export const updateMemberCardActivationStatus = async (req: Request, res: Response) => {
  try {
    const { member_id } = req.body;
    if (!member_id ) {
      return res.status(400).json({ message: 'UUID del miembro y nuevo estado son requeridos.' });
    }

    const updatedRecord = await MemberCardActivationProcessRepository.updateMemberCardActivationStatus(member_id);

    if (!updatedRecord) {
      return res.status(404).json({ message: 'No se encontró el registro de activación de tarjeta del miembro.' });
    }

    res.status(200).json(updatedRecord);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};