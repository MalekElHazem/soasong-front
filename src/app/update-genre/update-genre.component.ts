import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html',
  styles: ``
})
export class UpdateGenreComponent {

  @Input()
  genre! : Genre;

  @Output()
  genreUpdated = new EventEmitter<Genre>();
  
  @Input()
  ajout!:boolean;


  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateGenre ",this.genre);
  }

  saveGenre(){
    this.genreUpdated.emit(this.genre);
  }
}
