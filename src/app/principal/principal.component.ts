import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  userProgress = {
    completedModules: 1,
    totalStars: 3
  };

  modules = [
    { id: 1, title: "Explorador de Luz", cover: "assets/img/Modulo1/M1H1P1.png", href: "/Modulo1/1", stars: 3 },
    { id: 2, title: "Guardianes de la Selva", cover: "assets/img/Modulo2/M2P1.png", href: "/Modulo2/1", stars: 0 },
    { id: 3, title: "Hay alguien reaccionando", cover: "assets/img/Modulo3/M3P1.png", href: "/Modulo3/1", stars: 0 },
    { id: 4, title: "Contemos", cover: "assets/img/Modulo4/M4P1.png", href: "/Modulo4/1", stars: 0 },
    { id: 5, title: "Repito y repita", cover: "assets/img/Modulo5/M5P1.png", href: "/Modulo5/1", stars: 0 },
    { id: 6, title: "Crea tu mundo", cover: "assets/img/Modulo6/M6P1.png", href: "/Modulo6/1", stars: 0 }
  ];

  constructor() {}

  ngOnInit(): void {
    // Si quieres hacer algo al iniciar, lo haces aquí
  }

  getStarsDisplay(stars: number): string {
    return '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  }

  getButtonLabel(stars: number): string {
    return stars > 0 ? 'Revisar' : 'Empezar';
  }
}
