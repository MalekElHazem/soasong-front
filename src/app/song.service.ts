import { Injectable } from '@angular/core';
import { Song } from './model/song.model';
import { Genre } from './model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLGen } from './config';
import { Image } from './model/image.model'; // Add this line
import { GenreWrapper } from './model/genreWrapped';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';


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
  constructor(private http : HttpClient, private authService: AuthService) {

  

    /* this.songs = [
       {idSong : 1, nomSong : "PC Asus", nomArtist : "PC Asus", releaseDate : new Date("01/14/2011"), genre : {idGenre : 1, nomGenre : "PC"}},
       {idSong : 2, nomSong : "Imprimante Epson", nomArtist : "PC Asus", releaseDate : new Date("12/17/2010"), genre : {idGenre : 1, nomGenre : "PC"}},
       {idSong : 3, nomSong :"Tablette Samsung", nomArtist : "PC Asus", releaseDate : new Date("02/20/2020"), genre : {idGenre : 1, nomGenre : "PC"}}
   ];*/

  }


    listeSong(): Observable<Song[]>{ 
      return this.http.get<Song[]>(apiURL+"/all");
    }

     

  ajouterSong( song: Song):Observable<Song>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.post<Song>(apiURL+"/addsong", song, {headers:httpHeaders});
    }



  supprimerSong(id : number) {
    const url = `${apiURL}/delsong/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});
    }

    

  consulterSong(id: number): Observable<Song> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<Song>(url,{headers:httpHeaders});
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



    updateSong(song :Song) : Observable<Song> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.put<Song>(apiURL+"/updatesong", song, {headers:httpHeaders});
    }
   



    listeGenres():Observable<GenreWrapper>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<GenreWrapper>(apiURLGen,{headers:httpHeaders}
      );
      
    }
    /* consulterGenre(id:number): Genre{
       return this.genres.find(genre => genre.idGenre == id)!;
     } 
 */
/*
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
    }*/

    rechercherParGenre(idCat: number): Observable<Song[]> {
      const url = `${apiURL}/songen/${idCat}`;
      return this.http.get<Song[]>(url);
    }

    rechercherParNom(nom: string):Observable< Song[]> {
      const url = `${apiURL}/songsByName/${nom}`;
      return this.http.get<Song[]>(url);
    }
    
    ajouterGenre( cat: Genre):Observable<Genre>{
      return this.http.post<Genre>(apiURLGen, cat, httpOptions);
    }

    uploadImage(file: File, filename: string, songId: number): Observable<Image> {
      const formData = new FormData();
      formData.append('image', file, filename);
      
      return this.http.post<Image>(
        `${apiURL}/image/uploadImageSong/${songId}`,
        formData
      );
    }

    loadImage(id: number): Observable<Image> {
      const url = `${apiURL + '/image/get/info'}/${id}`;
      return this.http.get<Image>(url);
    }

    uploadImageSong(file: File, filename: string, idSong:number): Observable<any>{
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${apiURL + '/image/uploadImageSong'}/${idSong}`;
      return this.http.post(url, imageFormData);
    }

    supprimerImage(id : number) {
      const url = `${apiURL}/image/delete/${id}`;
      return this.http.delete(url, httpOptions);
    }

    
}
