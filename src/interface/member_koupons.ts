export interface IMemberKouponData {
    member_id?: number;
    member_uuid?: string | undefined;
    koupon_uuid?: string | undefined;
    koupon_id: number;
    koupon_value_id: number;
    external_reference_id?: string; 
    created_at?: Date; 
    updated_at?: Date; 
  }