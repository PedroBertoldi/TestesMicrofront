import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

export interface RouterEvent {
  url: string;
  replaceUrl: boolean;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[microFrontendRouting]',
})
export class MicroFrontendRoutingDirective implements OnInit, OnDestroy {
  @Input() routingPrefix?: string;

  private destroyed$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @HostListener('routeChange', ['$event'])
  handleRouteChange(event: { detail?: RouterEvent }) {
    this.navigateToUrl(event.detail);
  }

  navigateToUrl(event: RouterEvent | undefined): void {
    console.log('Caiu na diretiva');
    debugger;
    if (event?.url && event.url.startsWith('/')) {
      this.router.navigateByUrl(
        (this.routingPrefix ?? '') + event.url,
        {
          replaceUrl: event.replaceUrl || false,
        });
    } else {
      console.warn(
        `The microFrontendRouting directive received an invalid router event.`,
        event
      );
    }
  }

  ngOnInit(): void {
    this.route.url
      .pipe(
        map(() => this.router.url),
        takeUntil(this.destroyed$)
      )
      .subscribe((url) => {
        let newUrl = url;
        if (this.routingPrefix) {
          newUrl = newUrl.replace(this.routingPrefix, "");
          newUrl = newUrl ? newUrl : '/';
        }

        console.log('Url Change', {
          from: url,
          to: newUrl
        });

        this.element.nativeElement.route = newUrl;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
