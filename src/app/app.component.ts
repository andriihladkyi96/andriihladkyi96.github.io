import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @HostBinding('class') className = '';

  constructor(private overlay: OverlayContainer) { }

  toogleDarkMode($event:boolean){
    const darkClassName = 'darkMode';
    this.className = $event ? darkClassName : '';
    if ($event) {
      this.overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }
  };
}
