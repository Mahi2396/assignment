import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { DashboardService } from "./dashboard.service";
import { FiltersComponent } from "src/app/shared/component/filters/filters.component";
import { LoaderComponent } from "src/app/shared/component/loader/loader.component";

const routes: Routes = [{ path: "", component: DashboardComponent }];

@NgModule({
  declarations: [DashboardComponent, FiltersComponent, LoaderComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [DashboardService],
})
export class DashboardModule {}
