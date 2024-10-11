// src/app/state/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { signupUser, signupUserSuccess, signupUserFailure } from './user.actions';
import { UserState } from './user.model';

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(signupUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(signupUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(signupUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
