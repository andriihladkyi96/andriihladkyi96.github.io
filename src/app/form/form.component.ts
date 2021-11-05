import { MoviesService } from './../movies.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../models/movie';

export interface Data {
  newElement: {
    name: string,
    imageFile: File
    boxOffice: number,
    releaseData: Date
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<FormComponent>,@Inject(MAT_DIALOG_DATA) public data: Data,private movieService:MoviesService) { }

  ngOnInit(): void {
    this.dialogRef.afterClosed().subscribe(result => {
      if (result.imageFile) {
        this.getBase64(result.imageFile[0])
          .then(data =>
            this.movieService.addMovie(
              new Movie(
                this.movieService.getMoviesListSize(),
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
            this.movieService.getMoviesListSize(),
            result.name,
            "",
            this.formatBoxOffice(result.boxOffice),
            new Date(result.releaseData),
            new Date(),
            false
          )
        )
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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


