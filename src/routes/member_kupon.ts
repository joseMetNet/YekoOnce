import { Router } from 'express';
import { createMemberKoupon } from '../controllers/member_kupon';

const meberKuponRouter = Router();

/**
 * @swagger
 * /create-member-koupon:
 *   post:
 *     summary: Create a member koupon
 *     tags: [MemberKoupons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_uuid:
 *                 type: string
 *               koupon_uuid:
 *                 type: string
 *               koupon_value_id:
 *                 type: number
 *               external_reference_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member koupon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 member_id:
 *                   type: number
 *                 koupon_id:
 *                   type: number
 *                 koupon_value_id:
 *                   type: number
 *                 external_reference_id:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
meberKuponRouter.post('/create-member-koupon', createMemberKoupon);
export default meberKuponRouter;