export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  }
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geoLocation: {
      lat: string;
      long: string;
    }
  }
  phone: string;
}

export interface Credentials {
  username?: string;
  password?: string;
}
