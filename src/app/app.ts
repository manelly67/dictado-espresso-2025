import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { provideIcons } from '@ng-icons/core';
import { featherSun } from '@ng-icons/feather-icons';
import { featherMoon } from '@ng-icons/feather-icons';
import { heroPlayPause } from '@ng-icons/heroicons/outline';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [provideIcons({ featherSun, featherMoon, heroPlayPause, heroPlaySolid })],
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App {

}

