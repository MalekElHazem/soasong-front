import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { SongService } from '../song.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
})
export class SongsComponent implements OnInit {
  songs: Song[] = []; // Initialize as an empty array

  constructor(private songService : SongService,
      public authService: AuthService) { }
    
    ngOnInit(): void {
      this.chargerSongs();
      
    }

  
    chargerSongs(){
      this.songService.listeSong().subscribe(songs => {
      console.log(songs);
      this.songs = songs;
      });
    }

    supprimerSong(s: Song)
    {
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.songService.supprimerSong(s.idSong).subscribe(() => {
      console.log("song supprimé");
      this.chargerSongs();
      });
    } 
 


}
