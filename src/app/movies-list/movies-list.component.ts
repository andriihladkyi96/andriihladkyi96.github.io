import { Movie } from './../models/movie';
import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { LocalStorageService } from '../local-storage.service';


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
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit{


  moviesList: Movie[] = [];

  tableView: boolean = true;
  isMenu:boolean = false;
  panelOpenState:boolean = false;
  sortValue:string = "алфавітом";

  constructor(private dialog: MatDialog, private movieService: MoviesService,private localStorageService: LocalStorageService) { }


  ngOnInit() {
    this.moviesList = this.movieService.getMovies();
    this.tableView = this.localStorageService.getItem('tableView');
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

  deleteMovie($event: number): void {
    this.movieService.deleteMovie($event);
    this.updateMovies();
  }

  changeFavoriteStatus($event: number): void{
    this.movieService.toogleIsFavorite($event);
  }

  updateMovies(){
    this.moviesList = this.movieService.getMovies();
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
              new Movie(
                  this.moviesList.length,
                  result.name,
                  data,
                  this.formatBoxOffice(result.boxOffice),
                  new Date(),
                  new Date(result.releaseData),
                  false,
              )
            )
          )
      } else {
        this.movieService.addMovie(
            new Movie(
              this.moviesList.length,
              result.name,
              "",
              this.formatBoxOffice(result.boxOffice),
              new Date(result.releaseData),
              new Date(),
              false
            )
          )
      }
      this.updateMovies();
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
}
