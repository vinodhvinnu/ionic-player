import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalDataProvider } from '../../providers/global-data/global-data';

@IonicPage()
@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {

  public duration: number = 2.5;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalDataProvider: GlobalDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayPage');
  }

  togglePlay(){
    this.globalDataProvider.isPlaying ? this.globalDataProvider.currentSongInstance.pause() : this.globalDataProvider.currentSongInstance.play();
    this.globalDataProvider.isPlaying = !this.globalDataProvider.isPlaying;
  }

}
