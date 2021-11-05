import { Injectable, EventEmitter } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Movie } from './models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  moviesList: Movie[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  public moviesListChanged:EventEmitter<Movie[]> = new EventEmitter();

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
      movies => movies.isFavorite == true
    );
  }

  private saveChanges(){
    this.localStorageService.setItem("movies", this.moviesList);
    this.moviesListChanged.emit(this.moviesList);
  }

  search(searchTerm: string){
    if(searchTerm == ""){
      this.moviesListChanged.emit(this.moviesList);
    }
    this.moviesListChanged.emit(
      this.moviesList.filter(movie => movie.name.toLowerCase().startsWith(searchTerm))
    );
  }

  public getMoviesListSize(): number{
    return this.moviesList.length;
  }
}

const testData: Movie[] = [
  { "id": 0, "name": "Аватар", imageSourse: "../assets/images/avatar.jpg", releaseData: new Date(2009, 11, 17), boxOffice: "8.6М", dateOfCreation: new Date(2021, 11, 1), isFavorite: false },
  { "id": 1, "name": "Месники: Завершення", imageSourse: "../assets/images/avengers.jpg", releaseData: new Date(2019, 3, 25), boxOffice: "5.9М", dateOfCreation: new Date(2021, 11, 1), isFavorite: false },
  { "id": 2, "name": "Король Лев", imageSourse: "../assets/images/lion-king.jpg", releaseData: new Date(2019, 7, 19), boxOffice: "5.3М", dateOfCreation: new Date(2021, 11, 1), isFavorite: false },
  { "id": 3, "name": "Пірати Карибського моря: На дивних берегах", imageSourse: "../assets/images/pirats.jpg", releaseData: new Date(2011, 4, 19), boxOffice: "5.2М", dateOfCreation: new Date(2021, 11, 3), isFavorite: false },
  { "id": 4, "name": "Мадагаскар 3", imageSourse: "../assets/images/madagascar.jpg", releaseData: new Date(2012, 5, 7), boxOffice: "4.8М", dateOfCreation: new Date(2021, 11, 4), isFavorite: false },
  { "id": 5, "name": "Хоббіт: Пустка Смоґа", imageSourse: "../assets/images/hobbit.jpg", releaseData: new Date(2013, 11, 18), boxOffice: "4.7М", dateOfCreation: new Date(2021, 11, 4), isFavorite: false },
];