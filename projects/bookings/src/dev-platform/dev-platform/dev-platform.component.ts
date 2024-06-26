import { Component, HostBinding, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'mf-dev-platform',
  templateUrl: './dev-platform.component.html',
  styleUrls: ['./dev-platform.component.css'],
})
export class DevPlatformComponent implements OnInit {
  language: 'en' | 'de' = 'en';
  @HostBinding('class') theme: 'light' | 'dark' = 'light';

  constructor(
    private router: Router,
    private titleService: Title,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.updatePageTitleOnRouteChange();
  }

  updateTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
  }

  updateLanguage(lang: 'en' | 'de'): void {
    this.language = lang;
    this.translateService.use(lang);
  }

  private updatePageTitleOnRouteChange() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title) => {
        if (title) {
          this.titleService.setTitle(`${title} - Microtrains`);
        }
      });
  }
}
