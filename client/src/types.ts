export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
}

export interface Apartment {
  id: string;
  name: string;
  address: string;
  images: string[];
  object_code: string;
  floor: number;
  building_count: number;
  material: string;
  start_date: string;
  end_date: string;
  available_programs: string[];
  conditions: string[];
  description: string;
  has_balcony: boolean;
  is_balcony_glazed: boolean;
  building_start_date: string;
  home_type: string;
  bathroom_type: string;
  security: string;
  parking_type: string;
  elevator_type: string;
  apartment_types: {
    label: string;
    room_count: number;
    min_area: number;
    max_area: number;
    cost_per_square_meter: number;
    available_count: number;
    scheme_url: string;
  }[];
  builder: {
    icon: string;
    name: string;
    contacts: string;
    phone_number: string;
    site: string;
    email: string;
  };
}

export interface Application {
  id: string;
  name: string;
  status: string;
  creation_date: string;
  document_url: string;
}

export interface Profile {
  user: {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  address: string;
  social_categories: string;
  phone_number: string;
  iin: string;
}
