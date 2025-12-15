import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  id: string;
  fullName: string;
  email: string;
  country: string;
  role: string;
  address: string;
  avatarUrl: string;
  kyc: boolean;
  kycStatus: string;
  balance:number;
}

const initialState: userState = {
  id: "",
  fullName: "",
  email: "",
  role: "",
  country: "",
  avatarUrl: "",
  kyc: false,
  address: "",
  kycStatus: "",
  balance:0,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<userState>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.country = action.payload.country;
      state.kyc = action.payload.kyc;
      state.avatarUrl = action.payload.avatarUrl;
      state.address = action.payload.address;
      state.kycStatus = action.payload.kycStatus;
      state.balance = action.payload.balance;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
