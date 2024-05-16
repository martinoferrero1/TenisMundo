import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { DetalleJugadorComponent } from './detalle-jugador/detalle-jugador.component';
import { AgregarJugadoresComponent } from './agregar-jugadores/agregar-jugadores.component';
import { EditarYEliminarJugadoresComponent } from './editaryeliminar-jugadores/editaryeliminar-jugadores.component';
import { EdicionJugadorComponent } from './edicion-jugador/edicion-jugador.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'jugador/:id', component: DetalleJugadorComponent },
  { path: 'agregarjugadores', component:  AgregarJugadoresComponent },
  { path: 'editaryeliminarjugadores', component: EditarYEliminarJugadoresComponent },
  { path: 'editarjugador/:id', component: EdicionJugadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
