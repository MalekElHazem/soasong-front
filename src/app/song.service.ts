import { Injectable } from '@angular/core';
import { Song } from './model/song.model';
import { Genre } from './model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLGen } from './config';
import { GenreWrapper } from './model/genreWrapped';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

  
@Injectable({
  providedIn: 'root'
})

export class SongService {  
  songs: Song[] = []; // Initialize as an empty array
  //song! : Song;
  //genres : Genre[];
  constructor(private http : HttpClient) {

  

    /* this.songs = [
       {idSong : 1, nomSong : "PC Asus", nomArtist : "PC Asus", releaseDate : new Date("01/14/2011"), genre : {idGenre : 1, nomGenre : "PC"}},
       {idSong : 2, nomSong : "Imprimante Epson", nomArtist : "PC Asus", releaseDate : new Date("12/17/2010"), genre : {idGenre : 1, nomGenre : "PC"}},
       {idSong : 3, nomSong :"Tablette Samsung", nomArtist : "PC Asus", releaseDate : new Date("02/20/2020"), genre : {idGenre : 1, nomGenre : "PC"}}
   ];*/

  }

  listeSong(): Observable<Song[]>{
    return this.http.get<Song[]>(apiURL);
  } 
  
  

  ajouterSong( song: Song):Observable<Song>{
    return this.http.post<Song>(apiURL, song, httpOptions);
  }

  supprimerSong(id : number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }


  consulterSong(id: number): Observable<Song> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Song>(url);
  }

    trierSongs(){
      this.songs = this.songs.sort((n1,n2) => {
      if (n1.idSong! > n2.idSong!) {
      return 1;
      }
      if (n1.idSong! < n2.idSong!) {
      return -1;
      }
      return 0;
      });
    }

    updateSong(song :Song) : Observable<Song>
    {
    return this.http.put<Song>(apiURL, song, httpOptions);
    }


   

    listeGenres():Observable<GenreWrapper>{
      return this.http.get<GenreWrapper>(apiURLGen);
    }
      
    /* consulterGenre(id:number): Genre{
       return this.genres.find(genre => genre.idGenre == id)!;
     } 
 */

    rechercherParGenre(idGenre: number):Observable< Song[]> {
      const url = `${apiURL}/songen/${idGenre}`;
      return this.http.get<Song[]>(url);
    }
      
    rechercherParNom(nom: string):Observable< Song[]> {
      const url = `${apiURL}/songsByName/${nom}`;
      return this.http.get<Song[]>(url);
    }

    ajouterGenre( gen: Genre):Observable<Genre>{
      return this.http.post<Genre>(apiURLGen, gen, httpOptions);
    }
}
