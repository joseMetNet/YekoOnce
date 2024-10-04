import Card from '../models/card.model';
import Member from '../models/member.model';
import Membership from '../models/membership.model';
import Agreement from '../models/agreement.model';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { dbConnection } from '../DB/config';

class CardRepository {
  // Método para validar y activar la tarjeta
  async validateAndActivateCard(number: string, code: string, registrationDate: Date): Promise<Card | null> {
    const card: any = await Card.findOne({ where: { number, code } });

    if (!card) {
      throw new Error('Card not found'); 
    }

    if (card.status === 'active') {
      throw new Error('Card is already active');
    }

    if (registrationDate > card.expires_at) {
      throw new Error('Card has expired');
    }

    card.status = 'active';
    await card.save();
    return card;
  }

  async getAgreementIdById(id: number): Promise<string | null> {
    const agreement = await Agreement.findOne({
      attributes: ['agreement_id'],
      where: { id },
    });

    if (agreement) {
      return (agreement.agreement_id as unknown as Buffer).toString('hex');
    }
    return null;
  }

  async createMember(memberData: any): Promise<number> {
    const agreementId = await this.getAgreementIdById(5);
    if (!agreementId) {
      throw new Error('Agreement ID does not exist');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(memberData.password, saltRounds);

    const memberId = uuidv4();
    const memberIdBinary = Buffer.from(memberId.replace(/-/g, ''), 'hex');

    memberData.password = hashedPassword;
    memberData.agreement_id = Buffer.from(agreementId.replace(/-/g, ''), 'hex');
    memberData.member_id = memberIdBinary;
    memberData.preferred_department_id = Buffer.from(memberData.preferred_department_id.replace(/-/g, ''), 'hex');

    const member = await Member.create(memberData);
    return member.id;
  }

  async createMembership(memberId: number, cardId: number, publicId: Buffer): Promise<Membership> {
    const membershipData = {
      public_id: publicId,
      member_id: memberId,
      card_id: cardId,
    };

    const membership = await Membership.create(membershipData);
    return membership;
  }

  async findMemberByEmail(email: string) {
    return await Member.findOne({ where: { email } });
  }

  async getCardIdByNumber(number: string | any): Promise<number | null> {
    try {
      const [results]: any = await dbConnection.query(
        `SELECT id FROM yekoclub.card WHERE number = '${number}'`,
      );
      return results.length > 0 ? results[0].id : null;
    } catch (error: any) {
      throw new Error(`Error al obtener card_id por número: ${error.message}`);
    }
  }

   // Método para obtener el ID de miembro por identificación
  async getMemberIdByIdentification(identification: string | any): Promise<number | null> {
    try {
      const [results]: any = await dbConnection.query(
        `SELECT id FROM yekoclub.member WHERE identification = '${identification}'`,
      );
      return results.length > 0 ? results[0].id : null;
    } catch (error: any) {
      throw new Error(`Error al obtener member_id por identificación: ${error.message}`);
    }
  }

    // Método para obtener la membresía usando card_id
    async getMembershipByCardId(cardId: number): Promise<any | null> {
      try {
        const [results]: any = await dbConnection.query(
          `SELECT m.*, c.status AS card_status, mem.fullname, mem.email
          FROM yekoclub.membership m
          JOIN yekoclub.card c ON m.card_id = c.id
          JOIN yekoclub.member mem ON m.member_id = mem.id
          WHERE m.card_id = '${cardId}'`,
        );
        return results.length > 0 ? results : null;
      } catch (error: any) {
        throw new Error(`Error al obtener membresía por card_id: ${error.message}`);
      }
    }

    // Método para obtener la membresía usando member_id
  async getMembershipByMemberId(memberId: number | any): Promise<any | null> {
    try {
      const [results]: any = await dbConnection.query(
        `SELECT m.*, c.status AS card_status, mem.fullname, mem.email
        FROM yekoclub.membership m
        JOIN yekoclub.card c ON m.card_id = c.id
        JOIN yekoclub.member mem ON m.member_id = mem.id
        WHERE m.member_id = '${memberId}'`,
      );
      return results.length > 0 ? results : null;
    } catch (error: any) {
      throw new Error(`Error al obtener membresía por member_id: ${error.message}`);
    }
  }

  // Método principal para buscar membresías por número de tarjeta o identificación
  async findMembershipByNumberOrIdentification(number?: string, identification?: string): Promise<any | null> {
    try {
      // Si se proporcionan ambos parámetros
      if (number && identification) {
        const [results]: any = await dbConnection.query(
          `SELECT m.*, c.status AS card_status, mem.fullname, mem.email
           FROM yekoclub.membership m
           JOIN yekoclub.card c ON m.card_id = c.id
           JOIN yekoclub.member mem ON m.member_id = mem.id
           WHERE m.card_id = (SELECT id FROM yekoclub.card WHERE number = '${number}') 
             AND m.member_id = (SELECT id FROM yekoclub.member WHERE identification = '${identification}')`,
        );
        return results.length > 0 ? results[0] : null;
      }
  
      // Si solo se proporciona el número de tarjeta
      if (number) {
        const cardId = await this.getCardIdByNumber(number);
        if (cardId) {
          const membership = await this.getMembershipByCardId(cardId);
          return membership;
        }
        return null; // No se encontró la tarjeta
      }
  
      // Si solo se proporciona la identificación
      if (identification) {
        const memberId = await this.getMemberIdByIdentification(identification);
        if (memberId) {
          const membership = await this.getMembershipByMemberId(memberId);
          return membership;
        }
        return null; // No se encontró el miembro
      }
  
      return null; // No se proporcionó ni número ni identificación
    } catch (error: any) {
      throw new Error(`Error al buscar membresía: ${error.message}`);
    }
  }

  async getCardNumberByMemberId(memberId: number): Promise<string | null> {
    try {
      const [results]: any = await dbConnection.query(
        `SELECT c.number
         FROM yekoclub.membership m
         JOIN yekoclub.card c ON m.card_id = c.id
         WHERE m.member_id = '${memberId}'`
      );
      return results.length > 0 ? results[0].number : null;
    } catch (error: any) {
      throw new Error(`Error al obtener número de tarjeta por member_id: ${error.message}'`);
    }
  }
  async findMemberById(memberId: number) {
    return await Member.findOne({ where: { id: memberId } });
  }

  async isCardExpired(cardId: number): Promise<boolean> {
    try {
      const [results]: any = await dbConnection.query(
        `SELECT expires_at FROM yekoclub.card WHERE id = '${cardId}'`,
      );
  
      if (results.length === 0) {
        throw new Error('Tarjeta no encontrada.');
      }
  
      const cardExpiresAt = new Date(results[0].expires_at);
      const currentDate = new Date();
  
      return cardExpiresAt < currentDate;
    } catch (error: any) {
      throw new Error(`Error al verificar si la tarjeta está vencida: ${error.message}`);
    }
  }
}

export default new CardRepository();