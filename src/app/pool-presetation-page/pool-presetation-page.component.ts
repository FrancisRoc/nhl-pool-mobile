import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UserSearchService } from '../../app/shared/services/user-search.service';
import { Opponent } from '../add-opponent-form/opponent';
import { User } from '../../app/shared/models/user';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  moduleId: module.id,
  templateUrl: './pool-presetation-page.component.html',
  styleUrls: ['./pool-presetation-page.component.css']
})
export class PoolPresetationPageComponent implements OnInit {
  pools = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8",];
  showAddOppForm = false;
  model: any = {};
  myForm: FormGroup; // our form model
  memberModel = new Opponent('', '', '');
  users: Observable<User[]>;
  private searchTerms = new Subject<string>();

  // we will use form builder to simplify our syntax
  constructor(private _fb: FormBuilder, private userSearchService: UserSearchService) { }

  ngOnInit() {
    // we will initialize our form here
    this.myForm = this._fb.group({
      poolName: ['', Validators.required],
      members: this._fb.array([
        this.initMember(),
      ])
    });

    this.users = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.userSearchService.search(term)
        // or the observable of empty users if there was no search term
        : Observable.of<User[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<User[]>([]);
      });
  }

  initMember() {
    // initialize our address
    return this._fb.group({
      fullName: ['', Validators.required]
    });
  }

  addMember() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['members'];
    control.push(this.initMember());
  }

  removeMember(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['members'];
    control.removeAt(i);
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

  search(term: string, index?: number): void {
    if (index >= 0) {
      term = this.myForm.controls["members"].value[index].fullName;
    }
    console.log(term);
    this.searchTerms.next(term);
  }

}
