import { Request, Response } from 'express';
import CardRepository from '../repository/card.repository';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';
import { UniqueConstraintError } from 'sequelize';

export const createMemberAndMembership = async (req: Request, res: Response) => {
  try {
    const { number, code, memberData } = req.body;
    const registrationDate = moment().tz('America/Bogota').toDate();
    
    const ipAddress = req.ip.substring(0, 15);

    const card = await CardRepository.validateAndActivateCard(number, code, registrationDate);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const existingMember = await CardRepository.findMemberByEmail(memberData.email);
    if (existingMember) {
      return res.status(400).json({ message: 'The email address is already registered.' });
    }

    const memberIdNum = await CardRepository.createMember({
      ...memberData,
      agreement_id: memberData.agreement_id,
      activation_ip: ipAddress,
      created_at: registrationDate,
      updated_at: registrationDate,
      preferred_department_id: memberData.preferred_department_id,
    });

    if (!memberIdNum) {
      return res.status(500).json({ message: 'Failed to create member' });
    }

    const publicId = uuidv4();
    const publicIdBinary = Buffer.from(publicId.replace(/-/g, ''), 'hex');

    const membership = await CardRepository.createMembership(
      memberIdNum, 
      card.id,
      publicIdBinary
    );

    res.status(201).json({ memberId: memberIdNum, membership });
  } catch (error: any) {
    if (error instanceof UniqueConstraintError) {
      res.status(400).json({ message: 'The email address is already registered.' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const checkMembershipStatus = async (req: Request, res: Response) => {
  try {
    const { number, identification } = req.query;

    if (!number && !identification) {
      return res.status(400).json({ message: 'Debe proporcionar un número de tarjeta o una identificación' });
    }

    const membership = await CardRepository.findMembershipByNumberOrIdentification(
      number as string,
      identification as string
    );

    if (!membership) {
      return res.status(404).json({ message: 'Número de tarjeta o identificación incorrectos' });
    }

    const cardId = membership.card_id || membership[0]?.card_id;

    const isExpired = await CardRepository.isCardExpired(cardId);

    const membershipData = await CardRepository.getMembershipByCardId(cardId);

    if (!membershipData) {
      return res.status(404).json({ message: 'No se encontró información de la membresía con ese card_id' });
    }

    const memberId = membershipData[0]?.member_id;
    const member = await CardRepository.findMemberById(memberId);

    if (!member) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }

    if (isExpired) {
      return res.status(400).json({
        message: 'La tarjeta está vencida',
        memberData: {
          fullname: member.fullname,
          email: member.email,
          identification: member.identification
        }
      });
    }

    const cardStatus = membershipData[0]?.card_status;
    let cardMessage = '';

    if (cardStatus === 'active') {
      cardMessage = 'La tarjeta está activa';
    } else if (cardStatus === 'stock') {
      cardMessage = 'La tarjeta está inactiva';
    } else {
      cardMessage = `Estado de la tarjeta desconocido: ${cardStatus}`;
    }

    return res.status(200).json({
      message: cardMessage,
      memberData: {
        fullname: member.fullname,
        email: member.email,
        identification: member.identification
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};