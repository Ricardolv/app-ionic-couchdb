import { UsuarioProvider } from './../../providers/usuario/usuario-provider';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Usuario } from '../../entity/Usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Geolocation]
})
export class HomePage {

  public usuarios: any;
  public usuario = new Usuario();

  constructor(public navCtrl: NavController, public usuarioService: UsuarioProvider, private geolocation: Geolocation) {

  }

  ionViewDidLoad() {

    this.usuarioService.getUsuarios().then((data) => {
      this.usuarios = data;
    });

  }

  public editar(usuario){
    this.usuario = usuario;
  }

  public deletar(usuario){
    this.usuarioService.removeUsuario(usuario);
  }

  public salvarUsuario() {

    this.geolocation.getCurrentPosition().then((resp) => {

      this.usuario.latitude = resp.coords.latitude;
      this.usuario.longitude = resp.coords.longitude;

      this.usuarioService.createUsuario(this.usuario);

     }).catch((error) => {
       console.log('Error getting location', error);
     });


  };

}
