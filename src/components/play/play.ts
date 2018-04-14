import { Component } from '@angular/core';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
  selector: 'play',
  templateUrl: 'play.html'
})
export class PlayComponent {

  constructor(public globalDataProvider: GlobalDataProvider, public media: Media) {
    console.log('Hello PlayComponent Component');
  }

  togglePlay(){
    this.globalDataProvider.isPlaying ? this.globalDataProvider.currentSongInstance.pause() : this.globalDataProvider.currentSongInstance.play();
    this.globalDataProvider.isPlaying = !this.globalDataProvider.isPlaying;
  }

  seekTo() {
    this.globalDataProvider.currentSongInstance.seekTo(this.globalDataProvider.seekToNumber);
    this.globalDataProvider.seekToNumber += 10000;
  }

  next(){
    if(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex+1]){
      let index = this.globalDataProvider.currentSongIndex+1;
      this.globalDataProvider.currentSongIndex = this.globalDataProvider.songsList[index];
      this.globalDataProvider.currentSongInstance.release();
      this.globalDataProvider.seekToNumber = 10000;
      this.globalDataProvider.currentSong = this.globalDataProvider.songsList[index];
      this.globalDataProvider.currentSongInstance = this.media.create(this.globalDataProvider.songsList[index].src);
      this.globalDataProvider.currentSongInstance.play();
    }
  }
}
