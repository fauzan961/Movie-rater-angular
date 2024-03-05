import { NgModule } from '@angular/core';

// Imported Routes below
import { Routes, RouterModule } from '@angular/router';

// Import form module to use forms in the auth.component.html file
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';

// Import cookie service to use cookies to store our tokens while logging a user
import { CookieService } from 'ngx-cookie-service';

// Add routes below
const routes: Routes = [
  {path: 'auth', component: AuthComponent}
];


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Add this line in the imports
    ReactiveFormsModule
  ],
  providers: [CookieService], // Add CookieService in providers
  exports: [RouterModule] // Add RouterModule in the exports
})
export class AuthModule { }
