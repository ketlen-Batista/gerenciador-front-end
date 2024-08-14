export interface CompanyPost {
    name: string;
    address: string;
    phone: string;
    email: string;
    registrationNumber: string;
    website: string;
    emailPassword: string;
  }

  export interface CompanyPatch {
    name: string;
    address: string;
    phone: string;
    email: string;
    registrationNumber: string;
    website: string;
    emailPassword: string;
  }

  export interface CompanyResponse {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    registrationNumber: string;
    website: string;
    emailPassword: string;
  }