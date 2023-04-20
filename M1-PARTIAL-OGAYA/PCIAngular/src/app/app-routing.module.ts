import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowPartsComponent } from './pctable/show-parts/show-parts.component';
import { AddEditPartsComponent } from './pctable/add-edit-parts/add-edit-parts.component';
import { LoginComponent } from './user/login/login.component';
import { RegisComponent } from './user/register/register.component';
import { BuildPartsComponent } from './pctable/build-parts/build-parts.component';

const routes: Routes = [
  {path: 'showparts', component: ShowPartsComponent},
  {path: 'addeditparts', component: AddEditPartsComponent},
  //newly added code
  {path: '', component: LoginComponent},
  {path: 'regis', component: RegisComponent},
  {path: 'build', component: BuildPartsComponent}
  //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
