import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { SongService } from '../song.service';
import { AuthService } from '../auth.service';
import { Image } from '../model/image.model';

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

  /*
    chargerSongs(){
      this.songService.listeSong().subscribe(songs => {
      this.songs = songs;
      this.songs.forEach((song) => {
      this.songService
      .loadImage(song.image.idImage)
      .subscribe((img: Image) => {
        song.imageStr = 'data:' + img.type + ';base64,' + img.image;
      });
      });
      });
    }*/

      chargerSongs() {
        this.songService.listeSong().subscribe(songs => {
          this.songs = songs;
          this.songs.forEach((song) => {
            if (song.images && song.images.length > 0) {
              song.imageStr = 'data:' + song.images[0].type + ';base64,' + song.images[0].image;
            } else {
              song.imageStr = ''; // or set a default image string
            }
          });
        });
      }


      supprimerSong(s: Song) {
        let conf = confirm("Etes-vous sûr ?");
        if (conf) {
          this.songService.supprimerSong(s.idSong).subscribe({
            next: () => {
              console.log("song supprimé");
              this.chargerSongs();
            },
            error: (err) => {
              console.error('Error deleting song:', err);
            }
          });
        }
      }
 
   
}
