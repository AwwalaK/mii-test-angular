import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { Content2Component } from './content2/content2.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu1', pathMatch: 'full' },
  { path: 'menu1', component: ContentComponent },
  { path: 'menu2', component: Content2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
