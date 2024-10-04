import { Router } from 'express';
import { checkAbonadoStatus } from '../controllers/abonado.controller';

const abonadoRouter = Router();


/**
 * @swagger
 * /abonado/status:
 *   get:
 *     summary: Check if the user is an abonado by identification
 *     tags: [Abonado]
 *     parameters:
 *       - in: query
 *         name: identification
 *         schema:
 *           type: string
 *         description: User identification to check abonado status
 *         required: true
 *     responses:
 *       200:
 *         description: Abonado status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El usuario es abonado"
 *                 abonadoData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     identification:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request - identification not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Debe proporcionar una identificación"
 *       404:
 *         description: Abonado not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El usuario no es abonado"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al buscar el abonado: ..."
 */
abonadoRouter.get('/abonado/status', checkAbonadoStatus);
export default abonadoRouter;