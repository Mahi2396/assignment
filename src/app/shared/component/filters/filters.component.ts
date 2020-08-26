import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  @Input() list = [];
  public isSelectedItem: any;
  @Output() public itemClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  public onFilterClick(item) {
    this.isSelectedItem = item;
    this.itemClick.emit(item);
  }
}
