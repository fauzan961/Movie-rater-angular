import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {


  faEdit:any = faEdit;
  faTrash:any = faTrash;
  // Using Input to recieve data from parent component, recieving movie list from parent here
  @Input() movies: any = []

  @Output() selectMovie = new EventEmitter(); //Output to send data to parent component using EventEmitter
  @Output() editedMovie = new EventEmitter(); 
  @Output() createNewMovie = new EventEmitter(); 
  @Output() deletedMovie = new EventEmitter(); 


  constructor() {}

  ngOnInit() {

  }

  movieClicked(movie: any) {
    this.selectMovie.emit(movie) // Setting value of eventemitter here
  }

  editMovie(movie: any) {
    this.editedMovie.emit(movie) // Setting value of eventemitter here
  }

  newMovie() {
    this.createNewMovie.emit();
  }

  deleteMovie(movie:any) {
    this.deletedMovie.emit(movie);
  }

}
