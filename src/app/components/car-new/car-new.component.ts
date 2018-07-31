import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css'],
  providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public car: Car;
  public status_car: string;
  public message_car: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {
      this.page_title = ' Crear Nuevo Carro';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
   }

  ngOnInit() {
    if(this.identity == null){
      this._router.navigate(['/login']);
    }else{
      //crear objeto coche
      this.car = new Car(1, '', '', 0, 'true', null, null);
    }
  }
  onSubmit(form){
    this._carService.create(this.token, this.car).subscribe(
      response => {
        if(response.status == 'success'){
          this.status_car = 'success';
          console.log(this.status_car);
          this.message_car = response.message;
          //vaciamos el formulario
          this.car = new Car(1, '', '', 0, 'true', null, null);
          form.reset();
            this._router.navigate(['home']);
        }else{
          this.status_car = 'error';
          this.message_car = 'Error no se pudo crear un carro nuevo';
        }
      },
      error => {
        
        this.status_car = 'error';
        this.message_car = 'Error no se pudo crear un carro nuevo';
      }
    );
  }

}
