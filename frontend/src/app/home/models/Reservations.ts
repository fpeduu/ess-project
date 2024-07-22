export interface ReservationModel {
  id: string;
  room_id: string;
  user_id: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at?: string;
  user: {
    name: string;
    email: string;
  };
  room: {
    name: string;
    status: string;
    occupancy: string;
  };
}
