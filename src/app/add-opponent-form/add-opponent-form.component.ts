import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OpponentsService } from '../../app/shared/services/opponentsService';
import { UserSearchService } from '../../app/shared/services/user-search.service';
import { User } from '../../app/shared/models/user';
import { NgForm } from '@angular/forms'
import { Opponent } from './opponent';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-add-opponent-form',
  templateUrl: './add-opponent-form.component.html',
  styleUrls: ['./add-opponent-form.component.css']
})
export class AddOpponentFormComponent implements OnInit {
  @Output() showFormChange = new EventEmitter<boolean>();
  @Input() showForm;

  users: Observable<User[]>;
  private searchTerms = new Subject<string>();

  model = new Opponent('', '');

  constructor(private opponentsService: OpponentsService, private userSearchService: UserSearchService) { }

  ngOnInit() {
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

  onSubmit(form: NgForm) {
    console.log("Add opponent: " + form.value.opponent);
    //TODO THINK this.opponentsService.addOpponent(new Opponent(form.value.opponent, form.value.));
    this.showFormChange.emit(!this.showForm);
    form.resetForm();
  }

  cancel() {
    this.showFormChange.emit(!this.showForm);
  }

  addOpponent(user: User) {
    this.opponentsService.addOpponent(new Opponent(user.name, user.username));
    this.showFormChange.emit(!this.showForm);    
  }

  search(term: string): void {
    console.log("search opponent matching: " + term);
    console.log(this.users.count);
    this.searchTerms.next(term);
  }
}
