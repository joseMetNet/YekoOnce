export interface IDeliveryOrderData {
    member_id: number;
    recipient_name: string;
    department_id: number;
    city: string;
    address: string;
    phone: string;
    domicile_type: string;
    additional_references: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}