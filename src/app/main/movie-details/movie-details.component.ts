import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// Import faStar to use star icon in our component
import { faStar } from '@fortawesome/free-solid-svg-icons';

// Import our api serive below
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})  
export class MovieDetailsComponent implements OnInit {

  // Bind star icon to our variable so that we can use it in our html file
  faStar:any = faStar;
  rateHovered:any = 0;

  @Input() movie: any;
  @Output() updateMovie = new EventEmitter();

  constructor(private apiService: ApiService) {}
 
  ngOnInit() {}

  rateHover(rate:number){
    this.rateHovered = rate;
  }

  rateClicked(rate:number){
    this.apiService.rateMovie(rate, this.movie.id).subscribe(
      result => this.getDetails()
    );
  }

  getDetails(){
    this.apiService.getMovie(this.movie.id).subscribe(
      movie => this.updateMovie.emit(movie)
    );
  }
}
