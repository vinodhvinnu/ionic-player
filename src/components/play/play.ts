import { Component } from '@angular/core';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { NavController } from 'ionic-angular';
import { PlayPage } from '../../pages/play/play';
import { MusicControlsProvider } from '../../providers/music-controls/music-controls';

@Component({
  selector: 'play',
  templateUrl: 'play.html'
})
export class PlayComponent {

  constructor(public globalDataProvider: GlobalDataProvider, public navCtrl: NavController, public musicControlProvider: MusicControlsProvider) {
    console.log('Hello PlayComponent Component');
  }

  togglePlay(){
    this.musicControlProvider.togglePlay();
  }

  slideSong() {
    console.log('Song Changed');
  }

  showPlayScreen(){
    this.navCtrl.push(PlayPage);
  }
}
