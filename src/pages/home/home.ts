import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Dialogs } from '@ionic-native/dialogs';

import { Component } from '@angular/core';

import { UsuarioProvider } from './../../providers/usuario/usuario-provider';
import { Usuario } from '../../entity/Usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Geolocation, Camera, Dialogs]
})
export class HomePage {

  public usuarios: any;
  public usuario = new Usuario();
  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController, public usuarioService: UsuarioProvider,
              private geolocation: Geolocation, private camera: Camera,
              private dialogs: Dialogs) {

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

      this.dialogs.alert('Usuário salvo com sucesso!');

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  };

  public uploadImagem() {
    this.camera.getPicture(this.options).then((imageData) => {
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.usuario.foto = base64Image;

    this.dialogs.alert('Upload feito com sucesso!');

    }, (err) => {
      console.log(err);
    });
  }

}
