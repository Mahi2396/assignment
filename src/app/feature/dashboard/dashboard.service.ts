import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DashboardService {
  private BASE_URL = "https://api.spaceXdata.com/v3/launches?limit=100";

  constructor(private http: HttpClient) {}

  public getLaunchesList(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }

  public getAllLaunchesRecords(filterModal): Observable<any> {
    return this.http.get(
      this.BASE_URL +
        (filterModal.lSuccess !== null
          ? "&launch_success=" + filterModal.lSuccess
          : "") +
        (filterModal.lLanding !== null
          ? "&land_success=" + filterModal.lLanding
          : "") +
        (filterModal.year ? "&launch_year=" + filterModal.year : "")
    );
  }
}
