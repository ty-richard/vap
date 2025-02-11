interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    signedUp: boolean;
    signedIn: boolean;
    creditCardNumber: string;
    creditCardExpiration: string;
    creditCardCVC: string;
    itemsSaved: string[];
  }
  
  export default User;
  