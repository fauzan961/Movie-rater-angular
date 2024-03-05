import { Component, OnInit } from '@angular/core';

// import formgroup and formcontrol to use forms
import { FormGroup, FormControl } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { ApiService } from '../api.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
    ) {}

  authForm = new FormGroup({
    username: new FormControl(''), 
    password: new FormControl('')
  })

  registerMode:boolean = false

  ngOnInit() {
    // If token is found then it will redirect user to movies page
      const mrToken = this.cookieService.get('mr-token') // Checks if the token named mr-token is present in cookies
      if(mrToken){
        this.router.navigate(['/movies'])
      }
  }

  saveForm(){
    if(this.registerMode){
      this.apiService.registerUser(this.authForm.value).subscribe(
        (result:any) => { this.loginUser()
        }
      )
    }

    else{
      this.loginUser();
    } 

  }

  loginUser(){
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result:any) => {
      this.cookieService.set('mr-token', result.token) // This line saves our token in the cookie, Here the name of the token will be 'mr-token'
      this.router.navigate(['/movies'])

      }
    )
  }

}
