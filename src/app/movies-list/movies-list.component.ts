import { Movie } from './../models/movie';
import { MoviesService } from './../movies.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { LocalStorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})

export class MoviesListComponent implements OnInit,OnDestroy {

  moviesList: Movie[] = [];

  tableView: boolean = true;
  isMenu: boolean = false;
  panelOpenState: boolean = false;
  sortValue: string = "алфавітом";
  subscription: Subscription;

  constructor(private dialog: MatDialog, private movieService: MoviesService, private localStorageService: LocalStorageService) { }


  ngOnInit() {
    this.moviesList = this.movieService.getMovies();
    this.subscription = this.movieService.moviesListChanged.subscribe(
      (moviesList:Movie[])=>{
        this.moviesList = moviesList;
      }
    )
    this.tableView = this.localStorageService.getItem('tableView');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toogleView() {
    this.tableView = !this.tableView;
    this.localStorageService.setItem('tableView', this.tableView);
  }

  //sort logic
  sortByCreationDate() {
    this.moviesList = this.moviesList.sort(
      (a, b) => { return b.dateOfCreation.getTime() - a.dateOfCreation.getTime() }
    );
    this.sortValue = "датою створення";
    this.panelOpenState = false;
  }

  sortByRelease() {
    this.moviesList = this.moviesList.sort(
      (a, b) => { return b.releaseData.getTime() - a.releaseData.getTime() }
    );
    this.sortValue = "датою релізу";
    this.panelOpenState = false;
  }

  sortAlphabetically() {
    this.moviesList = this.moviesList.sort((a, b) => a.name.localeCompare(b.name));
    this.sortValue = "алфавітом";
    this.panelOpenState = false;
  }

  deleteMovie($event: number): void {
    this.movieService.deleteMovie($event);
  }

  changeFavoriteStatus($event: number): void {
    this.movieService.toogleIsFavorite($event);
  }

  // show a pop-up window for entering a new movie
  showDialog(): void {
    this.dialog.open(FormComponent,
      {
        width: '500px',
        data: { newElement: { name: " ", releaseData: new Date(), boxOffice: 0, imageFile: null } },
      });
  }
}
