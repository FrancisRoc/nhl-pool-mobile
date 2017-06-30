import { Component } from '@angular/core';
import { AuthService } from './shared/services/authentificationService';

const util = require('util');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private authService: AuthService) {
  }
}
