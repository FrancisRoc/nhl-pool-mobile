export class StatsAttributes {
  name: string;
  selectorName: string;
  isCheck: boolean;

  constructor(name: string, selectorName: string, isCheck: boolean) {
    this.name = name;
    this.selectorName = selectorName;
    this.isCheck = isCheck;
  }
}
