import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  private _storage: Storage | null = null;

  noticias: Article[] = [];

  constructor(private storage: Storage,
              public toastController: ToastController) {
    this.init();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
    this.cargarFavoritos();
  }

  guardarFavoritos(noticia: Article) {
    //debugger
    const existe = this.noticias.find((noti) => noti.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Agregado a favorito')
    }
  }

  async cargarFavoritos() {
    const favoritos = await this._storage.get('favoritos');

    if (favoritos) {
      console.log(favoritos);
      this.noticias = favoritos;
    } else {
      this.noticias = [];
    }
  }

  borrarFavorito(noticia:Article){
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title)
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de favorito')
  }

}
