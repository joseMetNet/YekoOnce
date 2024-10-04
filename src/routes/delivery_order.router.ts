import { Router } from 'express';
import { createDeliveryOrder } from '../controllers/delivery_order.controller';

const deliveryOrderRouter = Router();

/**
 * @swagger
 * /create-delivery-order:
 *   post:
 *     summary: Crear un nuevo pedido de entrega
 *     tags: [Delivery Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_id:
 *                 type: integer
 *               recipient_name:
 *                 type: string
 *               department_id:
 *                 type: integer
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               domicile_type:
 *                 type: string
 *               additional_references:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pedido de entrega creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pedido creado exitosamente."
 *       400:
 *         description: Petición incorrecta (por ejemplo, campos faltantes o inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todos los campos son requeridos."
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear el pedido de entrega."
 */
deliveryOrderRouter.post('/create-delivery-order', createDeliveryOrder);

export default deliveryOrderRouter;
