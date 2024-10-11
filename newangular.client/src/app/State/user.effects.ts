// src/app/state/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { signupUser, signupUserSuccess, signupUserFailure } from './user.actions';
import { User } from './user.model';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  signupUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupUser),
      mergeMap((action) =>
        this.http.post<User>('/api/Users', action.user).pipe(
          map((user) => signupUserSuccess({ user })),
          catchError((error) => of(signupUserFailure({ error })))
        )
      )
    )
  );
}
