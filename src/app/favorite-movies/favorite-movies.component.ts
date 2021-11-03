import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {

  moviesList: Movie[] = [];

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.updateMovies();
  }

  changeFavoriteStatus($event: number): void{
    this.movieService.toogleIsFavorite($event);
    this.updateMovies();
  }

  updateMovies(){
    this.moviesList = this.movieService.getFavoriteMovies();
  }
}
