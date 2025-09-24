import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages-m5',
  templateUrl: './pages-m5.component.html',
  styleUrls: ['./pages-m5.component.css']
})
export class PagesM5Component implements OnInit {
  page = 1;
  lastPage = 4;
  playPage = 3;

  imgSrc = '';
  prevLink = '';
  nextLink = '';
  endLink = '/principal';

  // URL del editor Scratch
  private scratchURL = 'https://hardware-for-education.github.io/Scratch_For_Education?modulo=modulo5.sb3';

  esMini = false;

  // guarda un bound para poder remover el listener si quieres en ngOnDestroy
  private resizeHandler = () => this.scaleMiniToFit();

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.page = Number(p.get('page') || 1);

      // Construyes la ruta de la imagen 
      this.imgSrc = `assets/img/Modulo5/M5P${this.page}.png`;

      // Anterior / Siguiente
      const prev = Math.max(1, this.page - 1);
      const next = Math.min(this.lastPage, this.page + 1);

      this.prevLink = `/Modulo5/${prev}`;
      this.nextLink = `/Modulo5/${next}`;
    });


    // Scratch
    const params = new URLSearchParams(window.location.search);
    this.esMini = params.get('mini') === '1';

    if (this.esMini) {
      document.body.classList.add('mini');

      // Re-escala al cambiar el tamaño de la ventana
      setTimeout(() => this.scaleMiniToFit(), 0);
      window.addEventListener('resize', this.resizeHandler);

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
    } else {
      // Asegura que fuera de mini NO quede nada aplicado
      document.body.classList.remove('mini');
      window.removeEventListener('resize', this.resizeHandler);

      // Limpia transform si venías de mini y regresaste
      const root = document.getElementById('mini-root');
      if (root) {
        root.style.transform = '';
        root.style.left = '';
        root.style.top = '';
        root.style.width = '';
        root.style.height = '';
        root.style.position = '';
      }
    }

  }

  constructor(private route: ActivatedRoute) { }

  abrirScratch(ev: MouseEvent) {
    ev.preventDefault();

    // (1) tamaño deseado del popup
    const W = 690;
    const H = 600;

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

  // Llama esto SOLO cuando es mini (ya detectas mini en ngOnInit)
  private scaleMiniToFit() {
    const root = document.getElementById('mini-root');
    if (!root) return;

    // Tamaño "diseño original" de escena
    const DESIGN_W = 690;
    const DESIGN_H = 500;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const scale = Math.min(vw / DESIGN_W, vh / DESIGN_H);

    root.style.width = `${DESIGN_W}px`;
    root.style.height = `${DESIGN_H}px`;
    root.style.transform = `scale(${scale})`;

    // centrar
    root.style.position = 'absolute';
    root.style.left = Math.max(0, (vw - DESIGN_W * scale) / 2) + 'px';
    root.style.top = Math.max(0, (vh - DESIGN_H * scale) / 2) + 'px';
  }
  
}

