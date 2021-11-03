import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Movie } from './models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  moviesList: Movie[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  public getMovies(): Movie[] {
    this.moviesList = this.localStorageService.getItem("movies") == null ? testData :  this.localStorageService.getItem("movies");
    return this.moviesList;
  }

  public deleteMovie(id: number) {
    this.moviesList = this.moviesList.filter(film => film.id !== id);
    this.saveChanges();
  }

  public addMovie(movie: Movie) {
    this.moviesList.push(movie);
    this.saveChanges();
  }

  public toogleIsFavorite(id: number) {
    let film = this.moviesList.find(element => element.id === id)
    if (film) {
      film.isFavorite = !film.isFavorite;
    };
    this.saveChanges();
  }

  public getFavoriteMovies() {
    return this.moviesList.filter(
      movies => movies.isFavorite === true
    );
  }

  private saveChanges(){
    this.localStorageService.setItem("movies", this.moviesList);
  }
}

const testData: Movie[] = [
  { "id": 0, "name": "Титанік", imageSourse: "", releaseData: new Date(2019, 12, 10), boxOffice: "14.3М", dateOfCreation: new Date(2020, 11, 5), isFavorite: false },
  { "id": 1, "name": "Зелена миля", imageSourse: "", releaseData: new Date(2018, 12, 10), boxOffice: "14.3М", dateOfCreation: new Date(2014, 1, 6), isFavorite: false },
  { "id": 2, "name": "Гаррі Поттер", imageSourse: "", releaseData: new Date(2017, 12, 10), boxOffice: "14.3М", dateOfCreation: new Date(2013, 1, 6), isFavorite: false },
  { "id": 3, "name": "Movie", imageSourse: "", releaseData: new Date(2016, 12, 10), boxOffice: "14.3М", dateOfCreation: new Date(2016, 7, 6), isFavorite: false },
  { "id": 4, "name": "Movie", imageSourse: "", releaseData: new Date(2016, 11, 10), boxOffice: "14.3М", dateOfCreation: new Date(2013, 8, 6), isFavorite: false },
  { "id": 5, "name": "Movie", imageSourse: "", releaseData: new Date(2014, 12, 10), boxOffice: "14.3М", dateOfCreation: new Date(2014, 1, 9), isFavorite: false },
  { "id": 6, "name": "Movie", imageSourse: "", releaseData: new Date(2013, 12, 10), boxOffice: "14.3М", dateOfCreation: new Date(2013, 1, 11), isFavorite: false },
  { "id": 7, "name": "Movie", imageSourse: "", releaseData: new Date(2012, 12, 10), boxOffice: "14.3М", dateOfCreation: new Date(2013, 2, 6), isFavorite: false },
  { "id": 8, "name": "Movie", imageSourse: "", releaseData: new Date(2021, 12, 10), boxOffice: "14.3М", dateOfCreation: new Date(2013, 1, 26), isFavorite: false },
];