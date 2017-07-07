import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OpponentsService } from '../../app/shared/services/opponentsService';
import { NgForm } from '@angular/forms'
import { Opponent } from './opponent';

@Component({
  selector: 'app-add-opponent-form',
  templateUrl: './add-opponent-form.component.html',
  styleUrls: ['./add-opponent-form.component.css']
})
export class AddOpponentFormComponent implements OnInit {
  @Output() showFormChange = new EventEmitter<boolean>();
  @Input() showForm;

  model = new Opponent('');

  constructor(private opponentsService: OpponentsService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log("Add opponent: " + form.value.opponent);
    this.opponentsService.addOpponent(new Opponent(form.value.opponent));
    this.showFormChange.emit(!this.showForm);
    form.resetForm();
  }

  cancel() {
    this.showFormChange.emit(!this.showForm);
  }
}
