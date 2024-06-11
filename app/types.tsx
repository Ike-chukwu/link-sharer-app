export interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ProfileDetails extends IFormInput {
  imgUrl: string;
  selectedFile: any;
}

export type arrayofLinks = {
  id: string;
  platform: string;
  link: string;
}[];

export interface linkObjType {
  id: string;
  platform: string;
  link: string;
}

export interface linkInput {
  actualLink: string;
}
