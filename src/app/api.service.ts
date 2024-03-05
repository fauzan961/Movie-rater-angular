import { Injectable } from '@angular/core';

// import Httpclient and headers to call our api
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseMovieUrl = 'http://127.0.0.1:8000/api/movies/';
  baseAuthUrl = 'http://127.0.0.1:8000/'


  // Add Httpclient in our constructor
  constructor( 
    private httpClient: HttpClient,
    private cookieservice: CookieService
  ) { }

  getMovies(){
    return this.httpClient.get(this.baseMovieUrl, {headers: this.getAuthHeaders()}) //Sends a get request to our baseMovieUrl along with the token in header
  }

  getMovie(id: number){
    return this.httpClient.get(`${this.baseMovieUrl}${id}/`, {headers: this.getAuthHeaders()}) //Sends a get request to our baseMovieUrl along with the token in header
  }

  createMovie(title:string, description:string){
    const body = JSON.stringify({title: title, description: description});
    return this.httpClient.post(this.baseMovieUrl, body, {headers: this.getAuthHeaders()})
  }

  updateMovie(id:number, title:string, description:string){
    const body = JSON.stringify({title: title, description: description});
    return this.httpClient.put(`${this.baseMovieUrl}${id}/`, body, {headers: this.getAuthHeaders()}) // PUT request to update a movie
  }

  removeMovie(id:number){
    return this.httpClient.delete(`${this.baseMovieUrl}${id}/`,  {headers: this.getAuthHeaders()})
  }

  rateMovie(rate:number, movieId:number){
    const body = JSON.stringify({stars: rate});
    return this.httpClient.post(`${this.baseMovieUrl}${movieId}/rate_movie/`, body, {headers: this.getAuthHeaders()}) //Sends a post request to our baseMovieUrl with params along with the token in header
  }

  loginUser(authData:any){
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseAuthUrl}login/`, body, {headers: this.getAuthHeaders()}) 
  }

  registerUser(authData:any){
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseAuthUrl}api/users/`, body, {headers: this.getAuthHeaders()}) 
  }


  // Function to get the value of token if present in cookie 
  getAuthHeaders(){
    const token = this.cookieservice.get('mr-token') // Getting value of our token from cookies

    // Storing our token using the HttpHeaders
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}` // Token is added here 
    })
  }
}
