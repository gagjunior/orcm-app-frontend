export interface UserDto {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  displayName?: string;
  photoUrl?: string;
  disabled?: boolean;
}
