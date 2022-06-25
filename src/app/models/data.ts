export interface IApartmentData {
  agentInfo: IAgentInfo;
  records: IRecord[];
  showContactInfo: boolean;
  role: string;
  title: string;
  body: string;
}

export interface IRecord {
  listID: number;
  order: number;
  propertyID: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  pets: boolean;
  washerDry: string;
  photo?: string;
  favorite: boolean;
  highestSentCommissions?: number;
  onsiteManager: string;
  management: string;
  proximity: number;
  section8: boolean;
  seniorHousing: boolean;
  studentHousting: boolean;
  floorplans: IFloorPlan[];
  highValueAmenities: string[];
  paidUtilities: string[];
  geocode: IGeocode;
}

export interface IGeocode {
  Longitude: string;
  Latitude: string;
  Percision?: string;
  IsValid: boolean;
}

export interface IAgentInfo {
  accountID: number;
  firstname: string;
  lastname: string;
  company: string;
  splashMessage: string;
  customHeader: string;
}

interface IFloorPlan {
  bedrooms: number;
  type: string;
  price: number;
}

export interface IAccount {
  listID: number;
  token: string;
  company: string;
}

export interface IAccountState {
  accounts: IAccount[];
  selectedAccount: IAccount;
}
