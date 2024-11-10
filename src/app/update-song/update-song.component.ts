import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../song.service';
import { Genre } from '../model/genre.model';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styles: []
})
export class UpdateSongComponent implements OnInit {
  currentSong = new Song();
  genres!: Genre[];
  updatedGenreId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private songService: SongService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    this.authService.loadToken(); // Ensure loadToken is called

    this.songService.listeGenres().subscribe(gens => {
      this.genres = gens._embedded.genres;
      console.log(gens);
    });

    this.songService.consulterSong(this.activatedRoute.snapshot.params['id']).subscribe(song => {
      this.currentSong = song;
      this.updatedGenreId = this.currentSong.genre.idGenre;
    });
  }

  updateSong() {
    this.currentSong.genre = this.genres.find(gen => gen.idGenre == this.updatedGenreId)!;
    this.songService.updateSong(this.currentSong).subscribe(() => {
      this.router.navigate(['songs']);
    });
  }
}