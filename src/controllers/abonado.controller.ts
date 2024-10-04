import { Request, Response } from 'express';
import AbonadoRepository from '../repository/abonado.repository';

export const checkAbonadoStatus = async (req: Request, res: Response) => {
  try {
    const { identification } = req.query;

    if (!identification) {
      return res.status(400).json({ message: 'Debe proporcionar una identificación' });
    }

    const result = await AbonadoRepository.findAbonadoByIdentification(identification as string);

    if (!result.abonado) {
      return res.status(404).json({ message: 'El usuario no es abonado' });
    }

    return res.status(200).json({
      message: result.message,
      abonadoData: result.abonado,
    });

  } catch (error: any) {
    res.status(500).json({ message: `Error al buscar el abonado: ${error.message}` });
  }
};
