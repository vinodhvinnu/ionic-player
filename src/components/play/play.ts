import { Component } from '@angular/core';
import { GlobalDataProvider } from '../../providers/global-data/global-data';

@Component({
  selector: 'play',
  templateUrl: 'play.html'
})
export class PlayComponent {

  constructor(public globalDataProvider: GlobalDataProvider) {
    console.log('Hello PlayComponent Component');
  }

  togglePlay(){
    this.globalDataProvider.isPlaying ? this.globalDataProvider.currentSongInstance.pause() : this.globalDataProvider.currentSongInstance.play();
    this.globalDataProvider.isPlaying = !this.globalDataProvider.isPlaying;
  }
}
