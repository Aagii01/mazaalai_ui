import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTrackCodeComponent } from './create-track-code/create-track-code.component';
const routes: Routes = [
  {path: 'create_trackcode', component: CreateTrackCodeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
