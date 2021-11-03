import { MoviesService } from './../movies.service';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormComponent } from '../form/form.component';

export interface FilmData {
  id: number,
  name: string,
  imageSourse: string,
  boxOffice: string,
  releaseData: Date,
  dateOfCreation: Date,
  isFavorite: boolean
}

export interface Data {
  newElement: {
    name: string,
    imageFile: File
    boxOffice: number,
    releaseData: Date
  }
}

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  providers: []
})
export class MoviesListComponent implements OnInit, OnDestroy {

  toggleControl = new FormControl(false);

  moviesList: FilmData[] = [];
  // JSON.parse(localStorage.getItem("films")||" ");

  moviesListFavorits: FilmData[] = [];

  tableView: boolean = true;
  favoriteView: boolean = false;
  isMenu:boolean = false;
  panelOpenState:boolean = false;
  sortValue:string = "алфавітом";

  @HostBinding('class') className = '';

  constructor(private dialog: MatDialog, private overlay: OverlayContainer, private movieService: MoviesService) { }
  ngOnDestroy(): void {
    // localStorage.setItem("films", JSON.stringify(this.moviesList));
  }


  ngOnInit() {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
    this.moviesList = this.movieService.getMovies();
  }

  toogleView() {
    this.tableView = !this.tableView;
  }

  //sort logic
  sortByCreationDate() {
    this.moviesList = this.moviesList.sort(
      (a, b) => { return b.dateOfCreation.getTime() - a.dateOfCreation.getTime() }
    );
    this.sortValue="датою створення";
    this.panelOpenState = false;
  }

  sortByRelease() {
    this.moviesList = this.moviesList.sort(
      (a, b) => { return b.releaseData.getTime() - a.releaseData.getTime() }
    );
    this.sortValue="датою релізу";
    this.panelOpenState = false;
  }

  sortAlphabetically() {
    this.moviesList = this.moviesList.sort((a, b) => a.name.localeCompare(b.name));
    this.sortValue="алфавітом";
    this.panelOpenState = false;
  }


  //favorite page movies logiс
  toogleIsFavorite(id: number) {
    this.movieService.toogleIsFavorite(id);
  }

  deleteFromFavorite(id: number) {
    let film = this.moviesList.find(element => element.id === id)
    if (film) {
      film.isFavorite = !film.isFavorite;
    }
    this.moviesListFavorits = this.sortByFavorite();
  }
  sortByFavorite() {
    return this.moviesList.filter(
      el => el.isFavorite === true
    );
  }
  toogleFavoriteView() {
    this.favoriteView = !this.favoriteView;
    this.moviesListFavorits = this.sortByFavorite();
  }


  //delete element from array
  deleteElement(id: number) {
    this.movieService.deleteMovie(id);
    this.moviesList = this.movieService.getMovies();
    this.moviesListFavorits = this.moviesListFavorits.filter(film => film.id !== id);
  }


  // show a pop-up window for entering a new movie
  // converts the result to the desired types
  // create a new object and add it to the array.
  showDialog(): void {
    const dialogRef = this.dialog.open(FormComponent,
      {
        width: '500px',
        data: { newElement: { name: " ", releaseData: new Date(), boxOffice: 0, imageFile: null } },
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result.imageFile) {
        this.getBase64(result.imageFile[0])
          .then(data => 
            this.movieService.addMovie(
                {
                  id: this.moviesList.length,
                  name: result.name,
                  dateOfCreation: new Date(),
                  releaseData: new Date(result.releaseData),
                  imageSourse: data,
                  isFavorite: false,
                  boxOffice:  this.formatBoxOffice(result.boxOffice),
                }
            )
          )
      } else {
        this.movieService.addMovie(
            {
              id: this.moviesList.length,
              name: result.name,
              dateOfCreation: new Date(),
              releaseData: new Date(result.releaseData),
              imageSourse: "",
              isFavorite: false,
              boxOffice: this.formatBoxOffice(result.boxOffice),
            }
          )
      }
    });
  }

  // converts  the image file to the Base64 format 
  private getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(typeof (reader.result) == "string" ? reader.result : "");
      reader.onerror = error => reject(error);
    });
  }


  private formatBoxOffice(receipts: number): string {
    let result = ""
    if (receipts > 1000000) {
      result = (receipts / 1000000).toFixed(1).toString() + "M";
    } else if (receipts > 1000) {
      result = (receipts / 1000).toFixed(1).toString() + "K";
    } else {
      result = receipts.toString();
    }
    return result;
  }

  toogleMenu(){
    this.isMenu = !this.isMenu;
  }
}
