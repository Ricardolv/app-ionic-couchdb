import { UsuarioProvider } from './../../providers/usuario/usuario-provider';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Usuario } from '../../entity/Usuario';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Geolocation, Camera]
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
              private geolocation: Geolocation, private camera: Camera) {

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

  public uploadImagem() {
    this.camera.getPicture(this.options).then((imageData) => {
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.usuario.foto = base64Image;

     console.log("upload feito com sucesso");
    }, (err) => {
      console.log(err);
    });
  }

}
