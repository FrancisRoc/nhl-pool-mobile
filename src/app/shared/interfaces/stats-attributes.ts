export class StatsAttributes {
  name: string;
  selectorName: string;
  isCheck: boolean;
  hide?: boolean;

  constructor(name: string, selectorName: string, isCheck: boolean, hide: boolean) {
    this.name = name;
    this.selectorName = selectorName;
    this.isCheck = isCheck;
    this.hide = hide;
  }
}
