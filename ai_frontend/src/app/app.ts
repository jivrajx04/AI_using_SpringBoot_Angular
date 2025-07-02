import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidemenu } from './components/sidemenu/sidemenu';

@Component({
  selector: 'app-root',
  imports: [Sidemenu, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
