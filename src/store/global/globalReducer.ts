/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/User.interface';
import {Immutable, produce} from "immer"

// Define a type for the slice state
interface IGlobalState {
	user: IUser | null;
	globalLoading: boolean;
}

// Define the initial state using that type
export const initialState: Immutable<IGlobalState> = {
	user: null,
	globalLoading: true
};

export const globalReducer = createSlice({
  name: 'global',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUserDetails(){},
    toggleLoader(state,action){
      produce(draft =>{
        draft.globalLoading = action.payload;     
        })
    },
    setUserDetails(state,action){
      produce(draft =>{
        const { data } = action.payload;
        draft.user = data;
        })
    },
    logOut(){},
    logInUser(state,action){
   }
  },
})

export const { getUserDetails,toggleLoader,setUserDetails,logOut,logInUser } = globalReducer.actions

export default globalReducer.reducer