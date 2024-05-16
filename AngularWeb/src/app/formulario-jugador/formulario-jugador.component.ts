
import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioJugadorServicio } from './formulario-jugador-servicio';
import { AvisoErrorServicio } from '../aviso-error/aviso-error-servicio';
import { ConfirmacionServicio } from '../confirmacion/confirmacion-servicio';

interface Jugador {
  nombre: String;
  nacimiento: {d: Number; m: Number; a: Number};
  pais: String;
  bandera_pais: String;
  titulos_individuales: Number;
  entrenador?: String;
  retiro?: Number;
  titulos_gs_individuales?: {ao?: Number[]; rg?: Number[]; wi?: Number[]; uo?: Number[]};
  mejor_ranking_individual: Number;
  imagen_jugador: String;
}

@Component({
  selector: 'app-formulario-jugador',
  templateUrl: './formulario-jugador.component.html',
  styleUrls: ['./formulario-jugador.component.css']
})
export class FormularioJugadorComponent implements OnInit {
  @ViewChild('campoNombre') campoNombre!: ElementRef<HTMLInputElement>;
  @ViewChild('campoDiaNacimiento') campoDiaNacimiento!: ElementRef<HTMLInputElement>;
  @ViewChild('campoMesNacimiento') campoMesNacimiento!: ElementRef<HTMLInputElement>;
  @ViewChild('campoAnioNacimiento') campoAnioNacimiento!: ElementRef<HTMLInputElement>;
  @ViewChild('campoPais') campoPais!: ElementRef<HTMLInputElement>;
  @ViewChild('campoBanderaPais') campoBanderaPais!: ElementRef<HTMLInputElement>;
  @ViewChild('campoCantidadTitulos') campoCantidadTitulos!: ElementRef<HTMLInputElement>;
  @ViewChild('campoOpcionRetiro') campoOpcionRetiro!: ElementRef<HTMLInputElement>;
  @ViewChild('campoOpcionEnActividad') campoOpcionEnActividad!: ElementRef<HTMLInputElement>;
  @ViewChild('campoAnioRetiro') campoAnioRetiro!: ElementRef<HTMLInputElement>;
  @ViewChild('campoEntrenadorActual') campoEntrenadorActual!: ElementRef<HTMLInputElement>;
  @ViewChild('campoMejorRankingIndividual') campoMejorRankingIndividual!: ElementRef<HTMLInputElement>;
  @ViewChild('campoImagenJugador') campoImagenJugador!: ElementRef<HTMLInputElement>;
  @ViewChild('miFormulario') miFormulario!: ElementRef<HTMLFormElement>;
  
  anios_opciones_gs: Number[] = [];
  anios_ao: Number[] = [];
  anios_rg: Number[] = [];
  anios_wi: Number[] = [];
  anios_uo: Number[] = [];
  opcion_seleccionada: string = '';
  preguntar_por_retiro: boolean = false;
  preguntar_por_entrenador: boolean = false;
  mostrar_barra_ao: boolean = false;
  mostrar_barra_rg: boolean = false;
  mostrar_barra_wi: boolean = false;
  mostrar_barra_uo: boolean = false;
  envio_erroneo: boolean = false;

  @Input() tipo_formulario: string = 'agregar';
  @Input() id_jugador_editado: string = '';
  @Output() nueva_confirmacion = new EventEmitter<void>();

  constructor(private http: HttpClient, private formularioJugadorServicio: FormularioJugadorServicio, private avisoErrorServicio: AvisoErrorServicio, private confirmacionServicio: ConfirmacionServicio) {
    for (let i = 1950; i <= 2023; i++) {
      this.anios_opciones_gs.push(i);
    }
  }

  ngOnInit() {
    if (this.tipo_formulario == 'editar') {
      const id_jugador = this.id_jugador_editado;
      const ruta_api = 'http://localhost:3000/Jugadores/datosjugador/' + id_jugador;
      this.http.get(ruta_api).subscribe((data: any) => {
        const jugador: Jugador = data;
        this.campoNombre.nativeElement.value = jugador.nombre.toString();
        this.campoDiaNacimiento.nativeElement.value = jugador.nacimiento.d.toString();
        this.campoMesNacimiento.nativeElement.value = jugador.nacimiento.m.toString();
        this.campoAnioNacimiento.nativeElement.value = jugador.nacimiento.a.toString();
        this.campoPais.nativeElement.value = jugador.pais.toString();
        this.campoBanderaPais.nativeElement.value = jugador.bandera_pais.toString();
        this.campoCantidadTitulos.nativeElement.value = jugador.titulos_individuales.toString();
        this.campoMejorRankingIndividual.nativeElement.value = jugador.mejor_ranking_individual.toString();
        this.campoImagenJugador.nativeElement.value = jugador.imagen_jugador.toString();
        if (jugador.hasOwnProperty('titulos_gs_individuales')) {
          this.anios_ao = jugador.titulos_gs_individuales!.ao!;
          this.marcarAniosYaElegidos(this.anios_ao, 'anios_ao');
          this.anios_rg = jugador.titulos_gs_individuales!.rg!;
          this.marcarAniosYaElegidos(this.anios_rg, 'anios_rg');
          this.anios_wi = jugador.titulos_gs_individuales!.wi!;
          this.marcarAniosYaElegidos(this.anios_wi, 'anios_wi');
          this.anios_uo = jugador.titulos_gs_individuales!.uo!;
          this.marcarAniosYaElegidos(this.anios_uo, 'anios_uo');
        }
        if (jugador.hasOwnProperty('retiro')) {
          this.campoOpcionRetiro.nativeElement.click();
          this.preguntar_por_retiro = true;
          this.campoAnioRetiro.nativeElement.value = jugador.retiro!.toString();
        }
        else if (jugador.hasOwnProperty('entrenador')) {
          this.campoOpcionEnActividad.nativeElement.click();
          this.preguntar_por_entrenador = true;
          this.campoEntrenadorActual.nativeElement.value = jugador.entrenador!.toString();
        }
      })
    }
  }

  private marcarAniosYaElegidos(anios: Number[], id_select: string) { //esta funcion permite marcar como seleccionados los años elegidos para cada Grand Slam para un jugador, y que se vean asi al momento de editar
    const elemento_select: HTMLSelectElement = document.getElementById(id_select) as HTMLSelectElement;
    for (let i = 0; i < anios.length; i++) {
      const opcion_seleccionada = elemento_select.options[anios[i].valueOf() - parseInt(elemento_select.options[0].value, 10)]; //el indice se calcula como el año menos el primero año (dado que son todos años consecutivos)
      this.modificarEstiloAnioSeleccionado('anio-no-seleccionado', 'anio-seleccionado', opcion_seleccionada);
    }
  }

  private camposCompletados() {
    if (this.campoNombre.nativeElement.value.trim() == '' || this.campoPais.nativeElement.value.trim() == '' || this.campoBanderaPais.nativeElement.value.trim() == '' || this.campoImagenJugador.nativeElement.value.trim() == '')
      return false;
    if (this.opcion_seleccionada == 'Retirado' && this.campoAnioRetiro.nativeElement.value.trim() !== '') //para el caso de estos dos inputs verifico ademas que realmente fuera necesario que sean completados (o sea si se marco la opcion para que aparezcan)
      return true;
    else if (this.opcion_seleccionada == 'En actividad' && this.campoEntrenadorActual.nativeElement.value.trim() !== '')
      return true;
    return false;
  }

  //la funcion camposCompletados se encarga de verificar que los campos se hayan completado realmente y no solo con espacios. En el caso de los campos correspondientes a la
  //fecha de nacimiento (dia, mes y año), a la cantidad de titulos y al mejor ranking individual, no verifico esto ya que son campos numericos required, por lo que no se
  //pueden completar con espacios y su validacion alcanza con el checkValidity() del formulario. Para el caso del año de retiro, sí se verifica con el trim porque no es
  //required, y aunque no se pueda completar con espacios por ser numerico, en caso de que no se haya ingresado nada el checkValidity igual devolveria true.
  
  confirmarOperacion() {
    const formulario_valido = this.miFormulario.nativeElement.checkValidity();
    if (formulario_valido && this.camposCompletados()) {
      this.confirmacionServicio.abrir(this.campoNombre.nativeElement.value);
      this.envio_erroneo = false;
    }
    else {
      this.avisoErrorServicio.abrir();
      this.envio_erroneo = true;
    }
  }

  seleccionarOpcionEstadoJugador(opcion: string) {
    this.opcion_seleccionada = opcion;
    this.preguntar_por_retiro = opcion === 'Retirado';
    this.preguntar_por_entrenador = opcion === 'En actividad';
  }

  private modificarEstiloAnioSeleccionado (clase_remover: string, clase_agregar: string, opcion_seleccionada: HTMLOptionElement) {
    opcion_seleccionada.classList.remove(clase_remover);
    opcion_seleccionada.classList.add(clase_agregar);
  }

  actualizarAniosSeleccionados(anios: Number[], anio_seleccionado: Number, id_select: string) {
    const elemento_select: HTMLSelectElement = document.getElementById(id_select) as HTMLSelectElement;
    const opcion_seleccionada = elemento_select.options[elemento_select.selectedIndex];
    const indice_anio = anios.indexOf(anio_seleccionado);
    if (indice_anio == -1) {
      let indice_recorrido = 0;
      while (indice_recorrido < anios.length && anios[indice_recorrido] < anio_seleccionado) {
        indice_recorrido++;
      }
      anios.splice(indice_recorrido, 0, anio_seleccionado); //hago una insercion ordenada ya que al cabo de varias inserciones es mas eficiente que un push y un sort
      this.modificarEstiloAnioSeleccionado('anio-no-seleccionado', 'anio-seleccionado', opcion_seleccionada);
    }
    else {
      anios.splice(indice_anio, 1);
      this.modificarEstiloAnioSeleccionado('anio-seleccionado', 'anio-no-seleccionado', opcion_seleccionada);
    }
  }

  seleccionAnio(event: any, torneo: string) {
    const opcion_seleccionada = Number(event.target.value);
    if (torneo == "Australian Open")
      this.actualizarAniosSeleccionados(this.anios_ao, opcion_seleccionada, 'anios_ao');
    else if (torneo == "Roland Garros")
      this.actualizarAniosSeleccionados(this.anios_rg, opcion_seleccionada, 'anios_rg');
    else if (torneo == "Wimbledon")
      this.actualizarAniosSeleccionados(this.anios_wi, opcion_seleccionada, 'anios_wi');
    else
      this.actualizarAniosSeleccionados(this.anios_uo, opcion_seleccionada, 'anios_uo');
  }

  modificarVisibilidadBarra(torneo: string) {
    if (torneo == "Australian Open")
      this.mostrar_barra_ao = !this.mostrar_barra_ao;
    else if (torneo == "Roland Garros")
      this.mostrar_barra_rg = !this.mostrar_barra_rg;
    else if (torneo == "Wimbledon")
      this.mostrar_barra_wi = !this.mostrar_barra_wi;
    else
      this.mostrar_barra_uo = !this.mostrar_barra_uo;
  }

  private reiniciarEleccionesTorneo(anios: Number[], id_select: string) {
    const elemento_select: HTMLSelectElement = document.getElementById(id_select) as HTMLSelectElement;
      for (let i = 0; i < elemento_select.length; i++) {
        const opcion_seleccionada = elemento_select.options[i]; 
        this.modificarEstiloAnioSeleccionado('anio-seleccionado', 'anio-no-seleccionado', opcion_seleccionada);
      }
    anios.splice(0, anios.length);
  }

  limpiarCampos() {
    this.preguntar_por_retiro = false;
    this.preguntar_por_entrenador = false;
    this.opcion_seleccionada = '';
    this.reiniciarEleccionesTorneo(this.anios_ao, 'anios_ao');
    this.reiniciarEleccionesTorneo(this.anios_rg, 'anios_rg');
    this.reiniciarEleccionesTorneo(this.anios_wi, 'anios_wi');
    this.reiniciarEleccionesTorneo(this.anios_uo, 'anios_uo');
    this.envio_erroneo = false;
    this.miFormulario.nativeElement.reset();
  }

  operacionConfirmada() {
    let jugador: Jugador = {
      nombre: this.campoNombre.nativeElement.value,
      nacimiento: {d: Number(this.campoDiaNacimiento.nativeElement.value), m: Number(this.campoMesNacimiento.nativeElement.value), a: Number(this.campoAnioNacimiento.nativeElement.value)},
      pais: this.campoPais.nativeElement.value,
      bandera_pais: this.campoBanderaPais.nativeElement.value,
      titulos_individuales: Number(this.campoCantidadTitulos.nativeElement.value),
      mejor_ranking_individual: Number(this.campoMejorRankingIndividual.nativeElement.value),
      imagen_jugador: this.campoImagenJugador.nativeElement.value
    }
    if (this.preguntar_por_retiro)
      jugador.retiro = Number(this.campoAnioRetiro.nativeElement.value);
    else if (this.preguntar_por_entrenador)
      jugador.entrenador = this.campoEntrenadorActual.nativeElement.value;
    if (this.anios_ao.length > 0 || this.anios_rg.length > 0 || this.anios_wi.length > 0 || this.anios_uo.length > 0) {
      jugador.titulos_gs_individuales = {}; //porque para hacer las asignaciones debo inicializar antes titulos_gs_individuales pero solo quiero que aparezca si el jugador ganó algún Grand Slam
      if (this.anios_ao.length > 0)
        jugador.titulos_gs_individuales.ao = [...this.anios_ao];
      if (this.anios_rg.length > 0)
        jugador.titulos_gs_individuales.rg = [...this.anios_rg];
      if (this.anios_wi.length > 0)
        jugador.titulos_gs_individuales.wi = [...this.anios_wi];
      if (this.anios_uo.length > 0)
        jugador.titulos_gs_individuales.uo = [...this.anios_uo];
    }
    const jugador_json = JSON.stringify(jugador);
    this.formularioJugadorServicio.setearJugador(jugador_json);
    this.nueva_confirmacion.emit();
    this.limpiarCampos();
  }
}
