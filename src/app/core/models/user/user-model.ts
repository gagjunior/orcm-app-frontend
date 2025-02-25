export interface UserModel {
  id: string;
  email: string;
  fullName: string;
  emailVerified: boolean;
  phoneNumber: string;
  displayName: string;
  photoUrl: string;
  disabled: boolean;
  createTime: string;
  updateTime: string;
  firestoreUid: string;
  changePassword: boolean;
}
