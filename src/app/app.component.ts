import {animate, state, style, transition, trigger} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {VideoTileDirective} from './video-tile.directive';

@Component({
  selector: 'app-root',
  template: `

    <button mat-icon-button id="hamburger" (click)="toggleMenu()">
      <mat-icon aria-label="menu">menu</mat-icon>
    </button>

    <mat-sidenav-container>

      <mat-sidenav mode="over" [opened]="menuOpened" class="side-menu">
        <button mat-button (click)="setFullscreen()">
          set fullscreen
        </button>
      </mat-sidenav>

      <mat-sidenav-content>

        <div [ngSwitch]="!!movie" #cont>

          <mat-grid-list cols="5" rowHeight="2:1" *ngSwitchDefault [@openClose]="!movie ? 'open' : 'closed'">

            <mat-grid-tile (click)="play(title.movie)" *ngFor="let title of movies">
              <!--<img src="/assets/gifs/giphy.gif" style="width: 100%">-->

              <img [src]="title.gif" style="width: 100%">
              <!--<video-->
              <!--appVideoTile-->
              <!--muted-->
              <!--[src]="title">-->
              <!--</video>-->
            </mat-grid-tile>

          </mat-grid-list>


          <div *ngSwitchCase="true" [@openClose]="!!movie ? 'open' : 'closed'"
               style="position: absolute; top: 0; left: 0; height: 100%; z-index: 99">
            <video #vid
                   controls
                   muted
                   [src]="movie">
            </video>
          </div>

        </div>

      </mat-sidenav-content>
    </mat-sidenav-container>



  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('1s')
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit {

  @ViewChild('vid')
  vid: ElementRef<HTMLVideoElement>;

  @ViewChild('cont')
  cont: ElementRef<HTMLDivElement>;

  @ViewChildren(VideoTileDirective)
  videos: QueryList<HTMLVideoElement>;

  menuOpened = false;
  movie: string;

  movies = [
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    },
    {
      title: 'film1',
      extension: 'MOV'
    }
  ].map(movie => ({
    ...movie,
    movie: `/assets/movies/${movie.title}.${movie.extension}`,
    gif: `/assets/gifs/${movie.title}.gif`
  }));

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  play(title: string) {
    this.movie = title;
    setTimeout(() => {
      requestFullscreen(this.vid.nativeElement);
      this.vid.nativeElement.addEventListener('ended', () => {
        delete this.movie;
        this.changeDetector.markForCheck();
      });
      this.vid.nativeElement.play();
    });
  }

  setFullscreen() {
    requestFullscreen(this.cont.nativeElement);
    this.menuOpened = false;
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  ngAfterViewInit(): void {
    // this.videos.toArray().forEach(video => {
    //   video.nativeElement.play();
    // });
  }

}

function requestFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}
