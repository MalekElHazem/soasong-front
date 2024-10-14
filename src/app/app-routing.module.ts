import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './songs/songs.component';
import { AddSongComponent } from './add-song/add-song.component';
import { UpdateSongComponent } from './update-song/update-song.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeGenresComponent } from './liste-genres/liste-genres.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SongGuard } from './song.guard';

const routes: Routes = [
  {path: "songs", component : SongsComponent},
  {path: "add-song", component : AddSongComponent, canActivate:[SongGuard]},
  { path: "", redirectTo: "songs", pathMatch: "full" },
  {path: "updateSong/:id", component: UpdateSongComponent},
  {path: "rechercheParGenre", component : RechercheParGenreComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeGenres", component : ListeGenresComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
