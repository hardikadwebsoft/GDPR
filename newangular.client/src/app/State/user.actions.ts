// src/app/state/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const signupUser = createAction('[User] Signup User', props<{ user: User }>());
export const signupUserSuccess = createAction('[User] Signup Success', props<{ user: User }>());
export const signupUserFailure = createAction('[User] Signup Failure', props<{ error: any }>());
