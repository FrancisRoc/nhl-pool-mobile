import { StatsAttributes } from 'app/shared/interfaces/stats-attributes'

export let IMPORTANT_STATS_ATTRS: StatsAttributes[] = [
  { name: "Goals", selectorName: "isGoalsSelected", isCheck: false },
  { name: "Assist", selectorName: "isAssistsSelected", isCheck: false },
  { name: "Points", selectorName: "isPointsSelected", isCheck: false },
  { name: "+/-", selectorName: "isPlusMinusSelected", isCheck: false },
  { name: "Penality Minutes", selectorName: "isPIMSelected", isCheck: false },
  { name: "Powerplay Goals", selectorName: "isPPGSelected", isCheck: false },
  { name: "Shorthanded Goals", selectorName: "isSHGSelected", isCheck: false },
  { name: "Powerplay Points", selectorName: "isPPPSelected", isCheck: false },
  { name: "Shortanded Points", selectorName: "isSHPSelected", isCheck: false },
  { name: "Hits", selectorName: "isHitsSelected", isCheck: false }
]

export let STAT_FROM_BOOLEAN = {
  "isGoalsSelected": "Goals",
  "isAssistsSelected": "Assists",
  "isPointsSelected": "Points",
  "isPlusMinusSelected": "+/-",
  "isPIMSelected": "PIM",
  "isPPGSelected": "PPG",
  "isSHGSelected": "SHG",
  "isPPPSelected": "PPP",
  "isSHPSelected": "SHP",
  "isHitsSelected": "Hits"
}

export let STAT_NAME_FROM_ABREVIATION = {
  "Goals": "goals",
  "Assists": "assists",
  "Points": "points",
  "+/-": "plusMinus",
  "PIM": "penalityMin",
  "PPG": "powerplayGoals",
  "SHG": "shorthandedGoals",
  "PPP": "powerplayPoints",
  "SHP": "shorthandedPoints",
  "Hits": "hits"
}
