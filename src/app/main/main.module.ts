import { NgModule } from '@angular/core';

// Import ReactiveForms to create our forms in movie-form component
import { ReactiveFormsModule } from '@angular/forms';

// Imported Routes below
import { Routes, RouterModule } from '@angular/router';

// Imported service below
import { ApiService } from '../api.service';

import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

// import Font Awesome module
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// imported newly created movie list, details and form components in this module
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

// Add routes below
const routes: Routes = [
  {path: 'movies', component: MainComponent}
];

// Declare the imported in the declarations array
@NgModule({
  declarations: [
    MainComponent,
    MovieDetailsComponent,
    MovieFormComponent,
    MovieListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Add this line in the imports
    FontAwesomeModule,
    ReactiveFormsModule // Added Forms in the imports
  ],
  exports: [RouterModule], // Add RouterModule in the exports
  providers: [ApiService] // Add imported service in the providers
})
export class MainModule { }
