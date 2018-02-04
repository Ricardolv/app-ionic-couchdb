import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class UsuarioProvider {

  public data: any;
  public db: any;
  public remote: any;

  constructor() {
    this.db = new PouchDB("usuario");

    this.remote = 'http://192.168.99.100:32777/usuario';

    let options = {
      live: true,
      retry: true,
      continuous: true
    }

    this.db.sync(this.remote, options);
  }

  public criarUsuario(usuario: any) {
    this.db.post(usuario);
  }

  public getUsuarios() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve =>
      this.db.allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];

        result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });

      })
    );

  }

  public handleChange(change: any){

  }

}
