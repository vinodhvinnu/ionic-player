import { MusicControls } from '@ionic-native/music-controls';
import { Injectable } from '@angular/core';
import { GlobalDataProvider } from '../global-data/global-data';
import { Media } from '@ionic-native/media';

@Injectable()
export class MusicControlsProvider {

  constructor(public musicControls: MusicControls, public globalDataProvider: GlobalDataProvider, public media: Media) {
    console.log('Hello MusicControlsProvider Provider');
    if(this.globalDataProvider.currentSongInstance){
      this.globalDataProvider.currentSongInstance.onSuccess.subscribe(this.songCompleted);
    }
  }

  togglePlay(){
    this.globalDataProvider.isPlaying ? this.globalDataProvider.currentSongInstance.pause() : this.globalDataProvider.currentSongInstance.play();
    this.globalDataProvider.isPlaying = !this.globalDataProvider.isPlaying;
  }


  play(file: any) {
    if (this.globalDataProvider.currentSongInstance && this.globalDataProvider.currentSongInstance != null) {
      this.globalDataProvider.currentSongInstance.stop();
    }
    this.globalDataProvider.currentSong = file;
    this.globalDataProvider.currentSongIndex = file.index;
    this.globalDataProvider.currentSongInstance = this.media.create(file.nativeURL);
    this.globalDataProvider.currentSongInstance.play();
    this.globalDataProvider.isPlaying = true;
  }

  songCompleted(){
      console.log('onSuccess is calling on skip');
      this.globalDataProvider.isPlaying = false;
  }

  seekTo() {
    this.globalDataProvider.currentSongInstance.seekTo(this.globalDataProvider.seekToNumber);
    this.globalDataProvider.seekToNumber += 10000;
  }

  next(){
    if(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex]){
      this.play(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex]);
    }
  }

  previous(){
    if(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex-2]){
      this.play(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex-2]);
    }
  }

}
