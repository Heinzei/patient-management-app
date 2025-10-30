export interface Patient {
  id?: number;
  lastname: string;
  firstname: string;
  birthdate: string; // ISO date string
  gender?: string;
  street?: string;
  housenumber?: string;
  postalcode?: string;
  insurance?: string;
  created_at?: string; // ISO datetime
}
