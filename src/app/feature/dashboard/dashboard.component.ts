import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public isLoader = false;
  public filterModel = {
    year: null,
    lSuccess: null,
    lLanding: null,
  };
  public filterOptionList = [
    {
      filterType: "year",
      title: "Launch Year",
      list: [
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
      ],
    },
    {
      filterType: "s_launch",
      title: "Successful Launch",
      list: [true, false],
    },
    {
      filterType: "s_landing",
      title: "Successful Landing",
      list: [true, false],
    },
  ];

  public launchesListResponse = [];
  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getLaunchesList();
  }

  private getLaunchesList() {
    this.isLoader = true;
    this._dashboardService.getLaunchesList().subscribe(
      (launchesList) => {
        console.log(launchesList);
        this.launchesListResponse = launchesList;
        this.isLoader = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoader = false;
      }
    );
  }

  public onFilterClick(selectedItem, type) {
    switch (type) {
      case "year":
        this.filterModel["year"] = selectedItem;
        break;
      case "s_launch":
        this.filterModel["lSuccess"] = selectedItem;
        break;
      case "s_landing":
        this.filterModel["lLanding"] = selectedItem;
        break;
    }
    this.filterLaunchList();
    console.log(this.filterModel);
  }

  private filterLaunchList() {
    this.getAllFilterModelResult();
  }

  private getAllFilterModelResult() {
    this.isLoader = true;
    this._dashboardService.getAllLaunchesRecords(this.filterModel).subscribe(
      (launches) => {
        if (launches.length) {
          this.launchesListResponse = launches;
        } else {
          this.launchesListResponse = [];
        }
        this.isLoader = false;
      },
      (err) => {
        this.isLoader = false;
      }
    );
  }
}
