import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SongsPage } from '../songs/songs';
import { VideosPage } from '../videos/videos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SongsPage;
  tab3Root = VideosPage;

  constructor() {

  }
}
