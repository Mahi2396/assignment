import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  const dashboardServiceSpy = jasmine.createSpyObj<DashboardService>(
    'DashboardService',
    ['getLaunchesList', 'getAllLaunchesRecords']
  );
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DashboardService,
          useValue: dashboardServiceSpy,
        },
      ],
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
