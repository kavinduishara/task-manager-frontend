export interface UserDetails {
  _id: string;
  name: string;
  email: string;
  profile:string|undefined;
  role: 'ADMIN' | 'USER'; // Expand roles if you have more types
}

export interface LoginResponse {
  message: string;
  user: UserDetails;
}


export interface ApiResponseData {
  user: UserDetails;
}

export interface GetUserDetailsResponse {
  message: string;
  data: ApiResponseData;
}

export interface GetUsersResponse {
  message: string;
  data: UserDetails[];
}
