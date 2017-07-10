import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OpponentsService } from '../../app/shared/services/opponentsService';
import { UserSearchService } from '../../app/shared/services/user-search.service';
import { User } from '../../app/shared/models/user';
import { NgForm } from '@angular/forms'
import { Opponent } from '../add-opponent-form/opponent';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-search-opponent-component',
  templateUrl: './search-opponent.component.html',
  styleUrls: ['./search-opponent.component.css']
})
export class SearchOpponentComponent implements OnInit {
  @Output() addOpponentForm = new EventEmitter<void>();
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

  search(term: string): void {
    console.log("search opponent matching: " + term);
    console.log(this.users.count);
    this.searchTerms.next(term);
  }

  addOpponent(user: User) {
    this.opponentsService.addOpponent(new Opponent(user.name, user.username));
    this.addOpponentForm.emit();
  }
}
