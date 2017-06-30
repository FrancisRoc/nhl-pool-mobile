import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/authentificationService';

@Component({
    selector: 'tool-bar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})

export class ToolBar implements OnInit {

    constructor(private router: Router, public authService: AuthService) {}

    ngOnInit() {}

    onMenuDraftedClick() {
      // Navigate to player infos page
      this.router.navigate(['/home/drafted']);
    }
    onMenuHomeClick() {
      // Navigate to player infos page
      this.router.navigate(['/home']);
    }
}
