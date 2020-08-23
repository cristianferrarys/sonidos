import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ANIMALES} from '../../data/data.animales';
import {Animal} from '../../interface/animales.interface';

import {Refresher, reorderArray} from 'ionic-angular'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  animales: Animal[] = [];

  audio = new Audio();
  auditoTiempo: any;

  ordenar: boolean = false;


  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
  }

reproducir( animal:Animal ){
  console.log(animal);

  this.pause_audio(animal);
  if(animal.reproduciendo){
    animal.reproduciendo =false;
    return ;
  }

  this.audio.src = animal.audio;

  this.audio.load();
  this.audio.play();
  animal.reproduciendo = true;
  this.auditoTiempo = setTimeout(()=> animal.reproduciendo = false ,animal.duracion *1000);

}

private pause_audio (audioSel:Animal){

  clearTimeout(this.auditoTiempo);
  this.audio.pause();
  this.audio.currentTime= 0;
  for (let animal of this.animales){
    if(animal.nombre != audioSel.nombre){
      animal.reproduciendo = false ;
    }
  }

}

borrar_animal(idx:number){
  this.animales.splice(idx,1);
}

refrescar(refresher:Refresher){
   console.log('Begin async operation');
   
    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1500);
  }
reordenar( idxs:any){
  console.log(idxs);
  
  this.animales = reorderArray(this.animales,idxs);

}

}
