import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CasesComponent } from './cases/cases.component';
import { MapComponent } from './map/map.component';


const routes: Routes = [{
  path: 'map',
  component: MapComponent
},
{
  path: '',
  component: CasesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
