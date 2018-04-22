import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { MusicControlsProvider } from '../../providers/music-controls/music-controls';

@IonicPage()
@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalDataProvider: GlobalDataProvider, public musicControlsProvider: MusicControlsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayPage');
  }

  togglePlay(){
    this.musicControlsProvider.togglePlay();
  }

  next(){
    this.musicControlsProvider.next();
  }

  previous(){
    this.musicControlsProvider.previous();
  }

}
