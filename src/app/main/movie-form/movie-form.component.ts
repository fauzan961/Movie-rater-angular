import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; // Importing from group and control

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {

  constructor(private apiService: ApiService){}

  movieForm:any; // Creating a blank variable for our movie Form
  id:any = null

  @Output() movieCreated = new EventEmitter();
  @Output() movieUpdated = new EventEmitter();

  // Below we are calling a function whenever the value of our input variable movie changes
  // The function will set the values of our form inputs title and description to our selected movies value with the help of set decorator
  @Input() set movie(val: any) {
    this.id = val.id
     // Creating FormGroup and Formcontrol to use Angular form in our movie-form html file.
    this.movieForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description)
    });
  }




  formDisabled(){
    if (this.movieForm.value.title.length && this.movieForm.value.description.length){
      return false;
    }
    else return true;
  }

// SaveForm will check if id is present or not, if present it will update movie and if not present it will create a new movie
  saveForm(){
    if(this.id){
      this.apiService.updateMovie(this.id, this.movieForm.value.title, this.movieForm.value.description).subscribe(
        result => this.movieUpdated.emit(result)
      )
    }
    else{
      // Will create a new value after submitting the form for new movie
    this.apiService.createMovie(this.movieForm.value.title, this.movieForm.value.description).subscribe(
      result => this.movieCreated.emit(result)
    )

    }


   
  }

  

}
