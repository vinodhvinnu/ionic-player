import { MusicControls } from '@ionic-native/music-controls';
import { Injectable } from '@angular/core';
import { GlobalDataProvider } from '../global-data/global-data';
import { Media } from '@ionic-native/media';

@Injectable()
export class MusicControlsProvider {

  private isPlayClicked: boolean = false;

  constructor(public musicControls: MusicControls, public globalDataProvider: GlobalDataProvider, public media: Media) {
    console.log('Hello MusicControlsProvider Provider');
  }

  togglePlay(){
    this.globalDataProvider.isPlaying ? this.globalDataProvider.currentSongInstance.pause() : this.globalDataProvider.currentSongInstance.play();
    this.globalDataProvider.isPlaying = !this.globalDataProvider.isPlaying;
  }

  play(file: any, isPlayClicked: boolean) {
    this.isPlayClicked = isPlayClicked;
    if (this.globalDataProvider.currentSongInstance && this.globalDataProvider.currentSongInstance != null) {
      this.globalDataProvider.currentSongInstance.release();
    }
    this.globalDataProvider.currentSong = file;
    this.globalDataProvider.currentSongIndex = file.index;
    this.globalDataProvider.currentSongInstance = this.media.create(file.nativeURL);
    this.globalDataProvider.currentSongInstance.play();
    this.globalDataProvider.currentSongInstance.onSuccess.subscribe(()=>{
      console.log('onSuccess is calling on skip');
      this.globalDataProvider.isPlaying = false;
      if(!this.isPlayClicked){
        this.next(false);
      }
    });
    setTimeout(()=>{
      this.globalDataProvider.isPlaying = true;
      this.isPlayClicked = false;
    }, 150);
  }

  seekTo(seekToDuration: number) {
    this.globalDataProvider.currentSongInstance.seekTo(seekToDuration);
  }

  next(isClicked){
    if(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex]){
      this.play(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex], isClicked);
    }
  }

  previous(isClicked){
    if(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex-2]){
      this.play(this.globalDataProvider.songsList[this.globalDataProvider.currentSongIndex-2], isClicked);
    }
  }

  getCurrentPosition(){
    this.globalDataProvider.currentSongInstance.getCurrentPosition().then((position) => {
      this.globalDataProvider.currentPosition = position*1000;
    });
  }

  getSongDuration(){
    this.globalDataProvider.currentSongDuration = this.globalDataProvider.currentSongInstance.getDuration();
  }

}
