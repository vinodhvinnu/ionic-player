import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SongsPage } from '../songs/songs';
import { VideosPage } from '../videos/videos';
import { PlaylistsPage } from '../playlists/playlists';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SongsPage;
  tab3Root = PlaylistsPage;
  tab4Root = VideosPage;
  tab5Root = SettingsPage;

  constructor() {

  }
}
