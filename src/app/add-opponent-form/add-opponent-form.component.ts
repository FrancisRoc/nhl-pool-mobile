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

  constructor(private opponentsService: OpponentsService, private userSearchService: UserSearchService) { }

  ngOnInit() {
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
    this.opponentsService.addOpponent(new Opponent(user._id, user.name, user.username));
    this.showFormChange.emit(!this.showForm);
  }
}
