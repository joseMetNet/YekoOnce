import Abonado from '../models/abonado.model';

class AbonadoRepository {
  
    async findAbonadoByIdentification(identification: string): Promise<{ message: string, abonado?: Abonado }> {
      try {
        const abonado = await Abonado.findOne({ where: { identification } });
  
        if (abonado) {
          return {
            message: 'El usuario es abonado',
            abonado, 
          };
        }
  
        return {
          message: 'El usuario no es abonado',
        };
      } catch (error: any) {
        throw new Error(`Error al buscar abonado por identificación: ${error.message}`);
      }
    }
  }

export default new AbonadoRepository();