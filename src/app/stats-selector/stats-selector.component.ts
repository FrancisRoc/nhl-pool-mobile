import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserOverallStatsComponent } from '../../app/user-overall-stats/user-overall-stats.component';
import { ImportantStatsService } from '../../app/shared/services/importantStatsService';
import { StatsAttributes } from '../../app/shared/interfaces/stats-attributes';

let util = require('util');

@Component({
  selector: 'app-stats-selector',
  templateUrl: './stats-selector.component.html',
  styleUrls: ['./stats-selector.component.css'],
})

export class StatsSelectorComponent implements OnInit {
  @Output() importantStatsAttrsChange = new EventEmitter<StatsAttributes>();
  importantStatsAttrs: StatsAttributes[];

  constructor(private importantStatsService: ImportantStatsService) {
  }

  ngOnInit() {
    console.log("Imposrtant stats load...");

    this.importantStatsService.getImportantStatsAttrs().subscribe((importantStatsAttrs: StatsAttributes[]) => {
        this.importantStatsAttrs = importantStatsAttrs;
    });
  }

  toggleSelectedStat(statAttrs: StatsAttributes) {
    this.importantStatsService.changeIsCheckStat(statAttrs);
    // Push changes to all subscribers
    let deepCopy: StatsAttributes = statAttrs;
    deepCopy.isCheck = !deepCopy.isCheck;
    this.importantStatsAttrsChange.emit(deepCopy);
  }
}
