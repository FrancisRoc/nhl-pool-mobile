import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/authentificationService';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.authService.handleAuth();
  }

  ngOnInit() {
  }

}
