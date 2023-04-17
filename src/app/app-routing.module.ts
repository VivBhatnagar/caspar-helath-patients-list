import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PateintDetailsComponent } from './pateint-details/pateint-details.component';
import { PatientsListComponent } from './patients-list/patients-list.component';

const routes: Routes = [{
   // added a componentless parent route.
    // It helps apply route activation guards to all routes at one place.
    path: '',
    canActivate: [
      // Activation Guard here applies to all routes below.
    ],
    children: [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
   component:PatientsListComponent
  },
  {
    path: 'patient-details',
    component: PateintDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '/home',}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
