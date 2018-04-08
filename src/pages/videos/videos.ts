import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalDataProvider } from '../../providers/global-data/global-data';

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalDataProvider: GlobalDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }

  public playFile(event, file){
    
  }

}
