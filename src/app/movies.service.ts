import { Injectable } from '@angular/core';

export interface FilmData {
  id: number,
  name: string,
  imageSourse: string,
  boxOffice: string,
  releaseData: Date,
  dateOfCreation: Date,
  isFavorite: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {



  moviesList: FilmData[] = [
    { "id": 1, "name": "Титанік", imageSourse: "", releaseData: new Date(2019, 12, 10), boxOffice: this.formatBoxOffice(145680000), dateOfCreation: new Date(2020, 11, 5), isFavorite: false },
    { "id": 0, "name": "Зелена миля", imageSourse: "", releaseData: new Date(2018, 12, 10), boxOffice: this.formatBoxOffice(895600000), dateOfCreation: new Date(2014, 1, 6), isFavorite: false },
    { "id": 2, "name": "Гаррі Поттер", imageSourse: "", releaseData: new Date(2017, 12, 10), boxOffice: this.formatBoxOffice(2890000), dateOfCreation: new Date(2013, 1, 6), isFavorite: false },
    { "id": 3, "name": "Movie", imageSourse: "", releaseData: new Date(2016, 12, 10), boxOffice: this.formatBoxOffice(789500000), dateOfCreation: new Date(2016, 7, 6), isFavorite: false },
    { "id": 4, "name": "Movie", imageSourse: "", releaseData: new Date(2016, 11, 10), boxOffice: this.formatBoxOffice(5600000), dateOfCreation: new Date(2013, 8, 6), isFavorite: false },
    { "id": 5, "name": "Movie", imageSourse: "", releaseData: new Date(2014, 12, 10), boxOffice: this.formatBoxOffice(2000), dateOfCreation: new Date(2014, 1, 9), isFavorite: false },
    { "id": 6, "name": "Movie", imageSourse: "", releaseData: new Date(2013, 12, 10), boxOffice: this.formatBoxOffice(46000), dateOfCreation: new Date(2013, 1, 11), isFavorite: false },
    { "id": 7, "name": "Movie", imageSourse: "", releaseData: new Date(2012, 12, 10), boxOffice: this.formatBoxOffice(100), dateOfCreation: new Date(2013, 2, 6), isFavorite: false },
    { "id": 8, "name": "Movie", imageSourse: "", releaseData: new Date(2021, 12, 10), boxOffice: this.formatBoxOffice(200000), dateOfCreation: new Date(2013, 1, 26), isFavorite: false },
  ];



  constructor() { }

  public getMovies(): FilmData[] {
    return this.moviesList
  }

  public deleteMovie(id: number) {
    this.moviesList = this.moviesList.filter(film => film.id !== id);
  }

  public addMovie(movie: FilmData) {
    this.moviesList.push(movie);
  }

  public toogleIsFavorite(id: number) {
    let film = this.moviesList.find(element => element.id === id)
    if (film) {
      film.isFavorite = !film.isFavorite;
    };
  }

  public getFavoriteMovies() {
    return this.moviesList.filter(
      movies => movies.isFavorite === true
    );
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
