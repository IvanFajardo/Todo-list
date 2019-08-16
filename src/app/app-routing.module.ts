import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  // { path: '', redirectTo: '/all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
