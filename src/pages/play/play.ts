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

  private seekToDuration: number = 0;
  private songInterval: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalDataProvider: GlobalDataProvider, public musicControlsProvider: MusicControlsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayPage');
    this.getSongDuration();
    this.getCurrentPosition();
  }

  togglePlay(){
    this.musicControlsProvider.togglePlay();
  }

  next(){
    this.musicControlsProvider.next(true);
  }

  previous(){
    this.musicControlsProvider.previous(true);
  }

  seekTo(event){
    //this.musicControlsProvider.seekTo(this.seekToDuration);
  }

  getSongDuration(){
    this.musicControlsProvider.getSongDuration();
  }

  getCurrentPosition(){
    this.songInterval = setInterval(()=>{
      this.musicControlsProvider.getCurrentPosition();
      this.seekToDuration = this.globalDataProvider.currentPosition;
      if(!this.globalDataProvider.isPlaying){
        clearInterval(this.songInterval);
      }
    }, 100);
  }

}
