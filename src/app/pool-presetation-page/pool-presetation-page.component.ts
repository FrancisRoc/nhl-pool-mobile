import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-pool-presetation-page',
  templateUrl: './pool-presetation-page.component.html',
  styleUrls: ['./pool-presetation-page.component.css']
})
export class PoolPresetationPageComponent implements OnInit {
  pools = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8",];
  showAddOppForm = false;
  model: any = {};

  constructor() { }

  ngOnInit() {
  }

  addPool() {
    console.log("Open pool creation dialog...");

  }

  /* Open */
  openNav() {
    console.log("Open add opponent form");
    this.showAddOppForm = !this.showAddOppForm;
  }

  /* Close */
  closeNav() {
    console.log("Close add opponent form");
    this.showAddOppForm = !this.showAddOppForm;
  }

}
