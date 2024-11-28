import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { AuthGuard } from './guards/secure.guard';

const routes: Routes = [
  {path: "produits", component : ProduitsComponent,canActivate:[AuthGuard],data : {roles:['ADMIN']}}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
