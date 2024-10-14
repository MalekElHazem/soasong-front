import { Genre } from "./genre.model";

export class Song {
    idSong!: number;
    nomSong? : string;
    nomArtist? : string;
    releaseDate? : Date ;
    genre! : Genre;
}