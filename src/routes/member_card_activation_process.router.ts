import { Router } from 'express';
import { updateMemberCardActivationStatus } from '../controllers/member_card_activation_procces.controller';

const memberCardActivationProcessRouter = Router();

/**
 * @swagger
 * /update-member-card-status:
 *   put:
 *     summary: Actualizar el estado de activación de una tarjeta de miembro
 *     tags: [Member Card Activation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estado de activación actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado actualizado exitosamente."
 *       400:
 *         description: Petición incorrecta (por ejemplo, UUID no encontrado o estado inválido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Member UUID no encontrado."
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar el estado de activación."
 */
memberCardActivationProcessRouter.put('/update-member-card-status', updateMemberCardActivationStatus)

export default memberCardActivationProcessRouter