import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserOverallStatsComponent } from '../../app/user-overall-stats/user-overall-stats.component';
import { ImportantStatsService } from '../../app/shared/services/importantStatsService';
import { StatsAttributes } from '../../app/shared/interfaces/stats-attributes';

let util = require('util');

@Component({
  selector: 'app-stats-selector',
  templateUrl: './stats-selector.component.html',
  styleUrls: ['./stats-selector.component.css'],
  providers: [ImportantStatsService],
})

export class StatsSelectorComponent implements OnInit {
  @Output() importantStatsAttrsChange = new EventEmitter<StatsAttributes>();
  importantStatsAttrs: StatsAttributes[];

  constructor(private importantStatsService: ImportantStatsService) {
  }

  ngOnInit() {
    this.importantStatsAttrs = this.importantStatsService.getImportantStatsAttrs();
  }

  toggleSelectedStat(statAttrs: StatsAttributes) {
    this.importantStatsService.changeIsCheckStat(statAttrs);
    // Push changes to all subscribers
    this.importantStatsAttrsChange.emit(statAttrs);
  }
}
