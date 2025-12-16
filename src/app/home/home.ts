import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleTheme } from '../toggle-theme/toggle-theme';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ToggleTheme],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  
}
