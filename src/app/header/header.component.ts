import { LocalStorageService } from './../local-storage.service';
import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenu:boolean = false;
  isDarkTheme:boolean=false;
  searchTerm:string="";
  isSearch:boolean = false;

  @Output()
  toogleDarkMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private localStorageService:LocalStorageService,private moviesService:MoviesService) { }

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

  toogleSearch(){
    this.isSearch = !this.isSearch;
  }

  searchThis(){
    this.moviesService.search(this.searchTerm);
  }

  onEnter(){
    this.isSearch = !this.isSearch;
  }
}
