import { Component, OnInit } from '@angular/core';

// import service below
import { ApiService } from 'src/app/api.service';

import { CookieService } from 'ngx-cookie-service'; //Import cookieservice

import { Router } from '@angular/router'; // Import router to use redirection below


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies: any = []
  selectedMovie: any = null
  editedMovie: any = null

  // Add service in the constructor
  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token') // Checks if the token named mr-token is present in cookies
    if (!mrToken) {
      this.router.navigate(['/auth']) // If token not present it will redirect to auth
    }
    else {    // Else will get the list of all movies
      this.apiService.getMovies().subscribe(
        data => {
          this.movies = data;
        },
      );
    }


  }

  // Recieving the data emitted from the child component
  selectMovie(movie: any) {
    this.selectedMovie = movie;
    this.editedMovie = null;
  }

  updateMovie(movie: any) {
    this.selectedMovie = movie;
    this.editedMovie = null;
    this.apiService.getMovies().subscribe(
      data => {
        this.movies = data;
      },
    );
  }

  editMovie(movie: any) {
    this.editedMovie = movie;
    this.selectedMovie = null;
  }

  createNewMovie() {
    this.editedMovie = { title: '', description: '' };
    this.selectedMovie = null;
  }

  deletedMovie(movie: any) {
    this.apiService.removeMovie(movie.id).subscribe(
      data => { this.movies = this.movies.filter((mov: any) => mov.id !== movie.id) }
    )
  }

  movieCreated(movie: any) {
    this.movies.push(movie)
    this.editedMovie = null;
  }

  movieUpdated(movie: any) {
    const index: number = this.movies.findIndex((mov: any) => mov.id === movie.id)
    if (index >= 0) {
      this.movies[index] = movie;
    }
    this.editedMovie = null;

  }

  logout() {
    this.cookieService.delete('mr-token') // Delete our token from cookie
    this.router.navigate(['/auth'])
  }

}
