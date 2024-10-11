

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserComponent } from './Component/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';
import { userReducer } from './State/user.reducer';
import { UserEffects } from './State/user.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
