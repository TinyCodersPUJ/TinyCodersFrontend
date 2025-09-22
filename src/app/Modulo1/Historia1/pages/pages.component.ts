import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  page = 1;
  imgSrc = '';
  prevLink = '';
  nextLink = '';
  endLink = '/principal';

  // URL del editor Scratch
  private scratchURL = 'https://hardware-for-education.github.io/Scratch_For_Education?modulo=modulo1.sb3'; //'http://localhost:8601';

  esMini = false;


  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.page = Number(p.get('page') || 1);

      // Construyes la ruta de la imagen 
      this.imgSrc = `../../../../assets/img/Modulo1/M1H1P${this.page}.png`;

      // Anterior / Siguiente (saltando la 5, que tiene su componente)
      const prev = Math.max(1, this.page - 1);
      const next = Math.min(8, this.page + 1);

      this.prevLink = `/Modulo1/${prev}`;
      this.nextLink = `/Modulo1/${next}`;
    });


    // Scratch
    const params = new URLSearchParams(window.location.search);
    this.esMini = params.get('mini') === '1';

    if (this.esMini) {
      document.body.classList.add('mini');

      const handler = () => {
        const returnTo = localStorage.getItem('returnTo') || '/';
        try {
          if (window.opener && !window.opener.closed) {
            window.opener.location.href = returnTo; // vuelve a tu app
            window.opener.focus();
          }
        } catch { }
        // (no llames window.close() aquí; se está cerrando ya)
      };

      // se dispara si el usuario cierra con la X o navega fuera
      window.addEventListener('beforeunload', handler);
      window.addEventListener('pagehide', handler); // iOS/Safari
    }

  }

  constructor(private route: ActivatedRoute) { }

  abrirScratch(ev: MouseEvent) {
    ev.preventDefault();

    // (1) tamaño deseado del popup
    const W = 690;
    const H = 500;

    // (2) calcula abajo‑derecha con un margen
    //const margin = 16;

    // datos de la ventana actual (multi‑monitor friendly)
    const scrLeft = window.screenX ?? window.screenLeft ?? 0;
    const scrTop = window.screenY ?? window.screenTop ?? 0;
    const outerW = window.outerWidth || window.innerWidth;
    const outerH = window.outerHeight || window.innerHeight;

    // posición "abajo‑derecha" relativa a la ventana actual
    const left = Math.max(0, scrLeft + outerW - W);
    const top = Math.max(0, scrTop + outerH - H);

    // features del popup
    const features = [
      `width=${W}`, `height=${H}`,
      `left=${left}`, `top=${top}`,
      'resizable=yes', 'scrollbars=yes',
      'menubar=no', 'toolbar=no', 'location=no', 'status=no'
    ].join(',');

    // 1) Abre una ventana emergente con ESTA MISMA página en "modo mini"
    const miniUrl = this.construirMiniUrl();
    const popup = window.open(
      miniUrl,
      'ventanaGuia',
      features
    );

    // 2) Guarda adónde regresar (por si hace falta)
    try {
      localStorage.setItem('returnTo', window.location.href);
    } catch { }

    // 3) Navega la pestaña principal hacia Scratch
    //    (Hazlo SÓLO si el popup se abrió; algunos navegadores bloquean popups)
    if (popup) {

      // (3) segundo ajuste por si el navegador ignoró la posición inicial
      try {
        popup.moveTo(left, top);
        popup.resizeTo(W, H);
      } catch { }

      // (4) algunos navegadores aplican el moveTo tras un tick
      setTimeout(() => {
        try { popup.moveTo(left, top); popup.resizeTo(W, H); } catch { }
      }, 50);

      // navega la pestaña principal a Scratch
      window.location.assign(this.scratchURL);
    } else {
      // Fallback: si se bloqueó el popup, abre Scratch en nueva pestaña
      window.open(this.scratchURL, '_blank');
      alert('Activa las ventanas emergentes para ver la ventana flotante.');
    }
  }

  private construirMiniUrl(): string {
    const url = new URL(window.location.href);
    url.searchParams.set('mini', '1'); // flag para modo ventana pequeña
    return url.toString();
  }

  terminarYVolver() {
    const returnTo = localStorage.getItem('returnTo') || '/';
    try {
      if (window.opener && !window.opener.closed) {
        // devuelve la pestaña principal a tu app/origen
        window.opener.location.href = returnTo;
        window.opener.focus();
        window.close(); // cierra el popup
      } else {
        // si no hay opener, navega aquí mismo
        window.location.href = returnTo;
      }
    } catch {
      window.location.href = returnTo;
    }
  }

}
