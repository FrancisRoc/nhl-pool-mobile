import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})

export class AppHeader implements OnInit {
    private title = 'Nhl Pool Helper';    // TODO put in config file

    constructor() {}

    ngOnInit() {}
}
