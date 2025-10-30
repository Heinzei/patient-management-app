export interface Patient {
  id?: number;
  lastname: string;
  firstname: string;
  birthdate: string; 
  gender?: string;
  street?: string;
  housenumber?: string;
  postalcode?: string;
  city?: string;
  insurance?: string;
  created_at?: string; 
}
