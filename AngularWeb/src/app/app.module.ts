import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './raiz/app.component';
import { DetalleJugadorComponent } from './detalle-jugador/detalle-jugador.component';
import { InicioComponent } from './inicio/inicio.component';
import { EncabezadoSecundarioComponent } from './encabezado-secundario/encabezado-secundario.component';
import { PelotasComponent } from './pelotas/pelotas.component';
import { OpcionesNavegacionComponent } from './opciones-navegacion/opciones-navegacion.component';
import { AgregarJugadoresComponent } from './agregar-jugadores/agregar-jugadores.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { AvisoErrorComponent } from './aviso-error/aviso-error.component';
import { FormularioJugadorComponent } from './formulario-jugador/formulario-jugador.component';
import { EditarYEliminarJugadoresComponent } from './editaryeliminar-jugadores/editaryeliminar-jugadores.component';
import { FiltradoJugadoresComponent } from './filtrado-jugadores/filtrado-jugadores.component';
import { EdicionJugadorComponent } from './edicion-jugador/edicion-jugador.component';

@NgModule({
  declarations: [
    AppComponent,
    DetalleJugadorComponent,
    InicioComponent,
    EncabezadoSecundarioComponent,
    PelotasComponent,
    OpcionesNavegacionComponent,
    AgregarJugadoresComponent,
    ConfirmacionComponent,
    AvisoErrorComponent,
    FormularioJugadorComponent,
    EditarYEliminarJugadoresComponent,
    FiltradoJugadoresComponent,
    EdicionJugadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
