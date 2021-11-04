import { LocalStorageService } from './../local-storage.service';
import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenu:boolean = false;
  isDarkTheme:boolean=false;

  @Output()
  toogleDarkMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.localStorageService.getItem("isDarkTheme");
    this.toogleDarkMode.emit(this.isDarkTheme);
  }

  toggleControl(){
    this.isDarkTheme = !this.isDarkTheme;
    this.localStorageService.setItem("isDarkTheme",this.isDarkTheme);
    this.toogleDarkMode.emit(this.isDarkTheme);
  }

  toogleMenu(){
    this.isMenu = !this.isMenu;
  }

}
