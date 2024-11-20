import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from '../model/song.model';
import { SongService } from '../song.service';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
})
export class AddSongComponent implements OnInit{

  newSong = new Song();
  genres! : Genre[];
  newIdGenre! : number;
  newGenre! : Genre;
  uploadedImage!: File;
  imagePath: any;
  constructor(private songService: SongService, private router: Router) { }

  ngOnInit(): void {
    this.songService.listeGenres().
    subscribe(gens => {this.genres = gens._embedded.genres;
    console.log(gens);
    });
  }

  addSong(){
    this.songService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.newSong.image=img;
    this.newSong.genre = this.genres.find(gen => gen.idGenre
    == this.newIdGenre)!;
    this.songService
    .ajouterSong(this.newSong)
    .subscribe(() => {
    this.router.navigate(['songs']);
    });
    });
  }





  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }
      
}
