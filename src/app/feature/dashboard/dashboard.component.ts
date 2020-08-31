import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FilterModel, FilterOptionsModal } from './dashboard.model';
import { FiltersComponent } from 'src/app/shared/component/filters/filters.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  /** Hold loader status if true show loader */
  public isLoader = false;
  /** Hold selected Filter options */
  public filterModel: FilterModel = {
    year: null,
    lSuccess: null,
    lLanding: null,
  };
  public clearButton = false;
  /** Hold Right side type of filter option response */
  public filterOptionList: FilterOptionsModal[] = [
    {
      filterType: 'year',
      title: 'Launch Year',
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
      filterType: 's_launch',
      title: 'Successful Launch',
      list: [true, false],
    },
    {
      filterType: 's_landing',
      title: 'Successful Landing',
      list: [true, false],
    },
  ];

  /** Hold Launcher response list */
  public launchesListResponse = [];

  @ViewChildren(FiltersComponent) filter: QueryList<FiltersComponent>;
  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getLaunchesList();
  }

  /** Get the All launcher list*/
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

  /** fire evnt on filter option click  & set selected item to the match type filterModel*/
  public onFilterClick(selectedItem: any, type: string) {
    if (selectedItem !== null) {
      this.clearButton = true;
      switch (type) {
        case 'year':
          this.filterModel['year'] = selectedItem;
          break;
        case 's_launch':
          this.filterModel['lSuccess'] = selectedItem;
          break;
        case 's_landing':
          this.filterModel['lLanding'] = selectedItem;
          break;
      }
      this.filterLaunchList();
    } else {
      Object.keys(this.filterModel).map((key) => {
        this.filterModel[key] = null;
      });
      this.getLaunchesList();
    }
  }

  /** To get Launcher list using filter options  */
  private filterLaunchList() {
    this.getAllFilterModelResult();
  }

  /** Call launcher serview to get the list */
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

  public clearFilter() {
    this.clearButton = false;
    this.filter.toArray().map((component) => {
      component.resetClass();
    });
    this.onFilterClick(null, null);
  }
}
