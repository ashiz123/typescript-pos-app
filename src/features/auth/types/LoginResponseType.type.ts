export type LoginResponseType  = {
  success: true;
  status: number;
  message: string;
  data: {
    id: string;
    email: string;
    token: string;
  };
}