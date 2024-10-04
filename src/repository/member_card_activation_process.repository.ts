import { dbConnection } from '../DB/config';
import MemberCardActivationProcess from '../models/member_card_activation_process.model';
import memberKouponsRepository from '../repository/member_koupons.repository';

class MemberCardActivationProcessRepository {
    async updateMemberCardActivationStatus(uuid: string): Promise<MemberCardActivationProcess | null> {
        try {
          const memberId = await memberKouponsRepository.getMemberIdByUUID(uuid);
    
          if (!memberId) {
            throw new Error('Member ID no encontrado para el UUID proporcionado.');
          }
    
          const [result]: any = await dbConnection.query(
            `UPDATE yekoclub.member_card_activation_process 
             SET status = 'choose_delivery_method' 
             WHERE member_id = ${memberId}`,
          );
    
          if (result.affectedRows === 0) {
            throw new Error('No se encontró el registro para actualizar.');
          }
    
          const updatedRecord = await MemberCardActivationProcess.findOne({
            where: { member_id: memberId }
          });
    
          return updatedRecord;
        } catch (error: any) {
          throw new Error(`Error al actualizar el estado de activación de la tarjeta del miembro: ${error.message}`);
        }
      }
}

export default new MemberCardActivationProcessRepository();