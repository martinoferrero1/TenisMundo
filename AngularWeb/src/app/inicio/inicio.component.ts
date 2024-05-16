import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  jugadores: any[] = [];
  backgroundImages: string[] = [
    'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/05/27/16536651148770.jpg',
    //'https://www.atptour.com/-/media/images/news/2022/06/05/13/35/nadal-roland-garros-2022-final-sunday.jpg', OTRA POSIBILIDAD DE FONDO DE NADAL
    'https://la-lista.com/wp-content/uploads/2022/04/E6MIasRWYAAdN28.jpg', //OTRA POSIBILIDAD DE FONDO DE FEDERER
    'https://cdn.mopo.de/uploads/sites/4/2023/01/imago1022672214h-scaled.jpg',
  ];
  currentImageIndex: number = 0;

  constructor(private router: Router, private http: HttpClient, private ngZone: NgZone) { 
    this.rotateBackground();
  }

  rotateBackground() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
    }, 5000);
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/Jugadores/').subscribe((data: any) => {
      this.ngZone.run(() => {
        this.jugadores = data;
      });
    })
  }

  verDetallesJugador(id: String) {
    this.router.navigate(['/jugador/' + id]);
  }
}
