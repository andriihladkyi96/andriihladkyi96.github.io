import { Movie } from './../models/movie';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input()
  movie!: Movie;

  @Input()
  tableView: boolean = true;

  @Output()
  deleteMovie: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  changeFavoriteStatus: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  deleteElement() {
    this.deleteMovie.emit(this.movie.id);
  }

  toogleIsFavorite() {
    this.changeFavoriteStatus.emit(this.movie.id);
  }
}
