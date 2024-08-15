export interface PermissionsUpdate {
  jobId: number;
  home?: boolean;
  homeAdmin?: boolean;
  homeBasic?: boolean;
  pageEmployess?: boolean;
  deleteUser?: boolean;
  editUser?: boolean;
  company?: boolean;
  companyAdmin?: boolean;
  companyBasic?: boolean;
  reports?: boolean;
  pointEletronic?: boolean;
  servicesRegister?: boolean;
  documentsPage?: boolean;
  documentsAdmin?: boolean;
  documentsBasic?: boolean;
  configs?: boolean;
  configContract?: boolean;
  configSector?: boolean;
  configOffice?: boolean;
  configPermission?: boolean;
  mobile?: boolean;
  desktop?: boolean;
}
