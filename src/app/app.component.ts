import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public identity;
  public token;

  constructor(
    private _userService: UserService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  ngOnInit(){
    console.log('app.component cargado');
  }
  ngDoCheck(){
    //se encarga de ver los cambios de componente o internos dentro de la app y actualiza ese troso de codigo, se actualiza cada ves que el usuario
    //vaya toqueteando dentro de la aplicación
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
