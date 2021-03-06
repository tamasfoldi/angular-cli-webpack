import {
  Component, NgModule
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tick, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { provideRoutes } from '@angular/router';
import { ComponentFixture } from '@angular/core/testing';
import {
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { HeroDetailComponent } from '../app/hero-detail/hero-detail.component';
import { HeroesComponent } from '../app/heroes/heroes.component';
import { HeroSearchComponent } from '../app/hero-search/hero-search.component';
import { HeroMockService } from './hero.mock.service';
import { HeroMockSearchService } from './hero.search.mock.service';

export const routerConfig: Routes = [
  { path: '', component: BlankComponent, pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'search', component: HeroSearchComponent }
];

export function createRoot(router: Router, componentType: any): ComponentFixture<any> {
  const f = TestBed.createComponent(componentType);
  advance(f);
  router.initialNavigation();
  advance(f);
  return f;
}

export function configureTests() {
  let mockHeroService = new HeroMockService();
  let mockHeroSearchService = new HeroMockSearchService();

  TestBed.configureTestingModule({
    imports: [
      { // TODO RouterTestingModule.withRoutes coming soon
        ngModule: RouterTestingModule,
        providers: [provideRoutes(routerConfig)],
      },
      TestModule
    ],
    providers: [
      mockHeroService.getProviders(),
      mockHeroSearchService.getProviders(),
      {
        provide: ActivatedRoute,
        useFactory: (r: Router) => r.routerState.root, deps: [Router]
      }
    ]
  });
}

export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

@Component({
  selector: 'app-blank-cmp',
  template: ``
})
export class BlankComponent {
}

@Component({
  selector: 'app-blank-cmp',
  template: `<router-outlet></router-outlet>`,
  entryComponents: [BlankComponent, DashboardComponent, HeroDetailComponent, HeroesComponent, HeroSearchComponent]
})
export class RootComponent {
}

@NgModule({
  imports: [RouterTestingModule, CommonModule, FormsModule],
  entryComponents: [
    BlankComponent,
    RootComponent,
    HeroSearchComponent,
    HeroesComponent,
    DashboardComponent,
    HeroDetailComponent
  ],
  exports: [
    BlankComponent,
    RootComponent,
    HeroSearchComponent,
    HeroesComponent,
    DashboardComponent,
    HeroDetailComponent
  ],
  declarations: [
    BlankComponent,
    RootComponent,
    HeroSearchComponent,
    HeroesComponent,
    DashboardComponent,
    HeroDetailComponent
  ]
})
class TestModule {
};
