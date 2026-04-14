export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: number;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    }
  }
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}