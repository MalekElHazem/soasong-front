import { Component } from '@angular/core';
import { Song } from '../model/song.model';
import { Genre } from '../model/genre.model';
import { SongService } from '../song.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styles: ``
})
export class RechercheParGenreComponent {

  songs! : Song[];
  IdGenre! : number;
  genres! : Genre[];

  constructor(private songService: SongService) {} // Inject SongService

  ngOnInit(): void {
    this.songService.listeGenres().
    subscribe(gens => {this.genres = gens._embedded.genres;
    console.log(gens);
    });
  }

  onChange() {
    this.songService.rechercherParGenre(this.IdGenre).
    subscribe(songs =>{this.songs=songs});
  }
}
