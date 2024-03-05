import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



// Import httpclientmodule to call our api's
import { HttpClientModule } from '@angular/common/http';

// Routes imported below
import { Routes, RouterModule } from '@angular/router';

// Imported our created Auth and Main Module
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';

// Import Font Awesome to use our icon library
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';

// Add routes below
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'} // If path is / it will automatically redirect to /movies
];

@NgModule({
  declarations: [
      AppComponent
  ],

  // Added Auth and Main Module in the below imports list
  imports: [
    BrowserModule,
    AuthModule,
    MainModule,
    RouterModule.forRoot(routes), //Add this line in the imports for routing
    HttpClientModule, //Added Httpclientmodule in the imports
    FontAwesomeModule
  ],
  exports: [RouterModule], //Add RouterModule in the exports
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
