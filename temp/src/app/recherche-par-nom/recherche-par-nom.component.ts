import { Component } from '@angular/core';
import { Song } from '../model/song.model';
import { SongService } from '../song.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent {

  songs!: Song[];
  nomSong!: string;
  allSongs! : Song[];
  searchTerm!: string;

  
  constructor(private songService: SongService) {} // Inject SongService

  ngOnInit(): void {
    this.songService.listeSong().subscribe(songs => {
    console.log(songs);
    this.songs = songs;
    });
  }
    
  rechercherSongs(){
    this.songService.rechercherParNom(this.nomSong).
    subscribe(songs => {
    this.songs = songs;
    console.log(songs)});
  }


  onKeyUp(filterText: string) {
    filterText = filterText.toLowerCase();
    this.songs = this.allSongs.filter(item =>
      item.nomSong?.toLowerCase().includes(filterText)
    );
  }
}
