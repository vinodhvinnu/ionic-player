import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { MusicControls } from '@ionic-native/music-controls';

@IonicPage()
@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html',
})
export class SongsPage {

  public fileInstance: MediaObject = null;

  constructor(public navCtrl: NavController, public platform: Platform, public media: Media, public globalDataProvider: GlobalDataProvider, private musicControls: MusicControls) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongsPage');
  }

  public playFile(event, file, index) {
    this.globalDataProvider.currentSongIndex = index;
    if (this.globalDataProvider.currentSongInstance && this.globalDataProvider.currentSongInstance != null) {
      this.globalDataProvider.currentSongInstance.stop();
    }
    this.globalDataProvider.currentSong = this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex];
    this.globalDataProvider.currentSongInstance = this.media.create(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex].src);
    this.globalDataProvider.currentSongInstance.play();

    this.globalDataProvider.currentSongInstance.onSuccess.subscribe(() => {
      if(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex+1]){
        this.globalDataProvider.currentSongIndex = this.globalDataProvider.currentSongIndex+1;
        this.globalDataProvider.currentSongInstance.stop();
        this.globalDataProvider.seekToNumber = 10000;
        this.globalDataProvider.currentSong = this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex];
        this.globalDataProvider.currentSongInstance = this.media.create(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex].src);
        this.globalDataProvider.currentSongInstance.play();
      } else {
        this.globalDataProvider.isPlaying = false;
      }
      //this.globalDataProvider.currentSongInstance.release();
    });

    /* setInterval(()=>{
      // get current playback position
      this.globalDataProvider.currentSongInstance.getCurrentPosition().then((position) => {
        console.log(position);
      });
    }, 500); */
    this.globalDataProvider.isPlaying = true;
  }

  
}
