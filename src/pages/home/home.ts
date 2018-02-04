import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuarios: any;
  public usuario= {nome:"",idade:""};

  constructor(public navCtrl: NavController, public usuarioService: UsuarioProvider) {

  }

  ionViewDidLoad() {

    this.usuarioService.getUsuarios().then((data) => {
      this.usuarios = data;
    });

  }

  public editar(usuario){
    this.usuario = usuario;
  }

  public salvarUsuario() {
      this.usuarioService.criarUsuario(this.usuario);
  };

}
