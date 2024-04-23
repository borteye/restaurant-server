type UserInfo = {
  username: string;
  password: string;
};

interface UserDetails {
  id: number;
  email: string;
  username: string;
  role: string;
  password: string;
  phone_number: string;
  gender: string;
}
export { UserInfo, UserDetails };
