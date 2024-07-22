// models/Equipment.ts
export interface EquipmentModel {
  id: string;
  name: string;
  description?: string;
  amount: number;
  created_at?: string; // datetime deve ser tratado como string
}
