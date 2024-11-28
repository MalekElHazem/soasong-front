import { Genre } from "./genre.model";
import { Image } from "./image.model";

export class Song {
    idSong!: number;
    nomSong? : string;
    nomArtist? : string;
    releaseDate? : Date ;
    genre! : Genre;
    image! : Image;
    imageStr!:string;
    images!: Image[];
}