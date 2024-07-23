export interface ReviewsModel {
  id: string;
  room_id: string;
  user_id: string;
  rating: number;
  comment: string;
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
