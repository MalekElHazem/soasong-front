import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { SongService } from '../song.service';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
  styles: ``
})
export class ListeGenresComponent implements OnInit {


  genres! : Genre[];

  updatedGenre:Genre = {"idGenre":0,"nomGenre":""};
  ajout:boolean=true;


  constructor(private songService : SongService) { }

  ngOnInit(): void {
  this.songService.listeGenres().
  subscribe(gens => {this.genres = gens._embedded.genres;
  console.log(gens);
  });
  }

  genreUpdated(gen:Genre){
    console.log("Cat updated event",gen);
    this.songService.ajouterGenre(gen).
     subscribe( ()=> this.chargerGenres());
  }

  chargerGenres(){
    this.songService.listeGenres().
    subscribe(gens => {this.genres = gens._embedded.genres;
    console.log(gens);
    });
  }


  updateGenre(gen:Genre) {
    this.updatedGenre=gen;
    this.ajout=false;
  }
}
