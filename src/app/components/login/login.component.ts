import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  public title: string;
  public user: User;
  public token;
  public identity;
  public status: string;
  public message: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Idintificate';
    this.user = new User(1,'ROLE_USER', '', '', '', '');
  }

  ngOnInit(){
    console.log('login.component cargado correctamente');
    this.logout();
  }
  onSubmit(form){
    console.log(form);

    this._userService.signup(this.user).subscribe(
      response=>{
        //token
        if(response.status != 'error'){
        this.token = response;
        localStorage.setItem('token', this.token);
        //objeto usuario identificado
        this._userService.signup(this.user, true).subscribe(
        response=>{
          //token
          this.identity = response;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.status = 'success';
            this.message = response.message;
          //redireccion
          this._router.navigate(['home']);
        },
        error => {
          console.log(<any>error);
        }
      )
    }else{
      this.status = 'error';
        this.message = response.message;
    }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  logout(){
    this._route.params.subscribe(params =>{
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //redireccion
        this._router.navigate(['home']);
      }

    })
  }


}
