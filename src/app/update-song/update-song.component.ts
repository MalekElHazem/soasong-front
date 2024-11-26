import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { Image } from '../model/image.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../song.service';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html'
})
export class UpdateSongComponent implements OnInit {
  currentSong = new Song();
  genres!: Genre[];
  updatedGenreId!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private songService: SongService
  ) {}
/*
  ngOnInit(): void {
    this.songService.listeGenres().subscribe(gens => {
      this.genres = gens._embedded.genres;
      console.log(gens);
    });

    this.songService.consulterSong(this.activatedRoute.snapshot.params['id'])
      .subscribe(song => {
        this.currentSong = song;
        this.updatedGenreId = song.genre.idGenre;

        console.log("song", song);
        console.log("image", song.image);
        console.log("idImage", song.image.idImage);
        
        // Add null check for image
        if (song.image && song.image.idImage) {
          this.songService.loadImage(song.image.idImage)
            .subscribe((img: Image) => {
              this.myImage = 'data:' + img.type + ';base64,' + img.image;
            });
        }
      });
  }*/

      ngOnInit(): void {
        this.songService.listeGenres().
        subscribe(cats => {this.genres = cats._embedded.genres;
        });
        this.songService.consulterSong(this.activatedRoute.snapshot.params['id'])
        .subscribe( prod =>{ this.currentSong = prod;
        this.updatedGenreId = prod.genre.idGenre;
        } ) ;
      }


/*
  updateSong() {
    this.currentSong.genre = this.genres.find(gen => gen.idGenre ==
    this.updatedGenreId)!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated)
    {
    this.songService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.currentSong.image = img;
    this.songService
    .updateSong(this.currentSong)
    .subscribe((song) => {
    this.router.navigate(['songs']);
    });
    });
    }
    else{
    this.songService
    .updateSong(this.currentSong)
    .subscribe((song) => {
    this.router.navigate(['songs']);
    });
    }
  }*/

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated =true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }


  onAddImageSong() {
    this.songService
    .uploadImageSong(this.uploadedImage,
    this.uploadedImage.name,this.currentSong.idSong)
    .subscribe( (img : Image) => {
    this.currentSong.images.push(img);
    this.uploadedImage = null!;
        this.myImage = '';
        this.isImageUpdated = false;
        // Reset the file input element
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
    });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.songService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentSong.images.indexOf(img, 0);
        if (index > -1) {
          this.currentSong.images.splice(index, 1);
        }
      });
    }
  }

  updateSong() {
    this.currentSong.genre = this.genres.find(gen => gen.idGenre == this.updatedGenreId)!;
    this.songService.updateSong(this.currentSong).subscribe(() => {
      if (this.uploadedImage) {
        this.songService.uploadImage(this.uploadedImage, this.uploadedImage.name, this.currentSong.idSong)
          .subscribe({
            next: (img: Image) => {
              if (!this.currentSong.images) {
                this.currentSong.images = [];
              }
              this.currentSong.images.push(img);
              this.router.navigate(['/']);
            },
            error: (err) => {
              console.error('Error uploading image:', err);
            }
          });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
    
    
}