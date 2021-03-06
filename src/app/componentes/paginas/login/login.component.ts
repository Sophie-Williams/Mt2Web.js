import { Component, OnInit } from '@angular/core';
//importando servicios
import { TitleService, AuthService } from '../../../servicios/servicios.module';
//importando modulos de formulario
import { FormGroup, FormControl, Validators} from '@angular/forms';
//importando interface
import { Ingreso } from '../../../interfaces/ingreso.interface';
//Importando Router
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  public titulo:string = "Ingresar";
  public mensaje:boolean = false;
  public formulario:FormGroup;
  public ingreso:Ingreso = {
    login:null,
    password:null
  }

  constructor(
    private _titulo:TitleService,
    private _router: Router,
    private _auth: AuthService
  ) {
  this._titulo.setTitulo('Metin2 '+this._titulo.servername+' - Login');

  this.formulario = new FormGroup({
    'login': new FormControl('',[
                                  Validators.required,
                                  Validators.minLength(4)
                                ]),
    'password': new FormControl('',[
                                  Validators.required,
                                  Validators.minLength(4)
                                ])
  })

  this.formulario.reset(this.ingreso);

  }

  ngOnInit() {
    if (localStorage.getItem('jwt') && localStorage.getItem('expired_at')){
      this._router.navigate(['/panel_usuario'])
    }
  }

  login(){
    this.mensaje = false;
    this._auth.login(this.formulario.value);
    let ingreso:Ingreso = {
      login: this.formulario.value['login'],
      password:''
    }

    setTimeout(()=> {
      if(this._auth.isAuthenticated() == true){
        this._router.navigate(['/panel_usuario']);
      } else {
        this.formulario.reset(ingreso);
        this.mensaje = true;
        setTimeout( () => {
          this.mensaje = false;
        }, 5000);        
      }
    },1000);


  }

}
