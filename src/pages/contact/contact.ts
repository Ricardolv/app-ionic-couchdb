import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public usuarios: any;

  constructor(public navCtrl: NavController, public usuarioService: UsuarioProvider) {
    this.usuarioService.getUsuarios().then((data)=>{
      this.usuarios = data;
    })
  }

}
