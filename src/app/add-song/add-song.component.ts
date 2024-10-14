import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from '../model/song.model';
import { SongService } from '../song.service';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
})
export class AddSongComponent implements OnInit{

  newSong = new Song();
  genres! : Genre[];
  newIdGenre! : number;
  newGenre! : Genre;
  constructor(private songService: SongService, private router: Router) { }

  ngOnInit(): void {
    this.songService.listeGenres().
    subscribe(gens => {this.genres = gens._embedded.genres;
    console.log(gens);
    });
  }




  addSong(){
    this.newSong.genre = this.genres.find(gen => gen.idGenre == this.newIdGenre)!;
    this.songService.ajouterSong(this.newSong)
    .subscribe(song => {
    console.log(song);
    this.router.navigate(['songs']);
    });
    }
}