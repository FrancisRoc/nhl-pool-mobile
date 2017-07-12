import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UserSearchService } from '../../app/shared/services/user-search.service';
import { PoolService } from '../../app/shared/services/pool.service';

import { Opponent } from '../add-opponent-form/opponent';
import { User } from '../../app/shared/models/user';
import { PoolResponse } from '../../app/shared/models/poolResponse';
import { Pool } from '../../app/shared/models/pool';

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
  pools: PoolResponse[] = [];
  inputsOnFocus: boolean[] = [];
  showAddOppForm = false;
  model: any = {};
  myForm: FormGroup; // our form model
  memberModel = new Opponent('', '', '');
  users: Observable<User[]>;
  private searchTerms = new Subject<string>();

  // we will use form builder to simplify our syntax
  constructor(private _fb: FormBuilder,
    private userSearchService: UserSearchService,
    private poolService: PoolService) {
      this.poolService.getAll().subscribe((pools: PoolResponse[]) => {
        this.pools = pools;
      });
    }

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
    // initialize our member
    this.inputsOnFocus.push(false);
    return this._fb.group({
      fullName: ['', Validators.required],
    });
  }

  addMember() {
    this.inputsOnFocus.push(false);
    // add member to the list
    const control = <FormArray>this.myForm.controls['members'];
    control.push(this.initMember());
  }

  removeMember(i: number) {
    // remove member from the list
    const control = <FormArray>this.myForm.controls['members'];
    control.removeAt(i);
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

  selectMember(index: number, user: User): void {
    const control = <FormArray>this.myForm.controls['members'];
    control.at(index).patchValue({ fullName: user.name + " (" + user.username + ")" });
    this.inputsOnFocus[index] = false;
  }

  createPool(form: FormGroup) {
    let poolName: string = this.myForm.controls["poolName"].value
    console.log("Pool name: " + poolName);

    let members: string[] = [];
    const control = <FormArray>this.myForm.controls['members'];
    for (let i = 0; i < control.length; i++) {
      var username: string = control.at(i).value.fullName;
      let begin: number = username.indexOf("(") + 1;
      let end: number = username.indexOf(")");
      members.push(username.substring(begin, end));
    }

    console.log(members);

    let pool: Pool = {
      name: poolName,
      members: members
    }
    //send data to server
    this.poolService.create(pool).subscribe((pool: PoolResponse) => {
      if (pool) {
        console.log(pool);
        this.pools.push(pool);
      }
    });

    this.showAddOppForm = !this.showAddOppForm;
  }

  onFocus(i: number) {
    let memberNumber: number = i + 1;
    console.log("Focus on input of member: " + memberNumber);

    for (let i = 0; i < this.inputsOnFocus.length; i++) {
      this.inputsOnFocus[i] = false
    }
    this.inputsOnFocus[i] = true;
  }

}
