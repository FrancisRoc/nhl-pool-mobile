import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../shared/services/authentification.service';
import { AlertService } from '../shared/services/alert.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  model: any = {};
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        this.router.navigate(['home']);
      },
      error => {
        console.log("Login error");
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
