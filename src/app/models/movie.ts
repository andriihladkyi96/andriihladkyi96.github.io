export class Movie{
    id: number
    name: string
    imageSourse: string
    boxOffice: string
    releaseData: Date
    dateOfCreation: Date
    isFavorite: boolean
    constructor(  id: number, name: string, imageSourse: string, boxOffice: string, releaseData: Date,dateOfCreation: Date,isFavorite: boolean){
        this.id = id;
        this.name = name;
        this.imageSourse = imageSourse;
        this.boxOffice = boxOffice;
        this.releaseData = releaseData;
        this.dateOfCreation = dateOfCreation;
        this.isFavorite = isFavorite;
    }
}