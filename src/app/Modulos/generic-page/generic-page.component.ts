import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MODULOS } from '../modulos.config';
@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.css']
})
export class GenericPageComponent implements OnInit, OnDestroy {
  modId = 1;
  page = 1;
  lastPage = 4;
  scratchPage = 4;

  showEmpezar = false;
  showFinalizar = false;
  showScratch = false;
  showAtras = false;
  showSiguiente = false;

  imgSrc = '';
  prevLink = '';
  nextLink = '';
  endLink = '/principal';
  scratchURL = '';

  esMini = false;
  private resizeHandler = () => this.scaleMiniToFit();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Leer parámetros dinámicos de la URL
    this.route.paramMap.subscribe(params => {
      this.modId = Number(params.get('modId') || 1);
      this.page = Number(params.get('page') || 1);
      this.loadConfig();
      this.updateContent();
    });

    const urlParams = new URLSearchParams(window.location.search);
    this.esMini = urlParams.get('mini') === '1';

    if (this.esMini) {
      document.body.classList.add('mini');
      setTimeout(() => this.scaleMiniToFit(), 0);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  /** Carga configuración del módulo actual */
  private loadConfig() {
    const config = MODULOS[this.modId] || MODULOS[1];
    this.lastPage = config.lastPage;
    this.scratchPage = config.scratchPage;
    this.scratchURL = `https://hardware-for-education.github.io/Scratch_For_Education?modulo=${config.scratchFile}`;
    this.endLink = config.endLink;
  }

  /** Actualiza las imágenes y los botones según la página */
  private updateContent() {
    this.imgSrc = `assets/img/Modulo${this.modId}/M${this.modId}P${this.page}.png`;
    console.log("Imagen a cargar ", this.imgSrc);

    const prev = Math.max(1, this.page - 1);
    const next = Math.min(this.lastPage, this.page + 1);
    this.prevLink = `/Modulo/${this.modId}/${prev}`;
    this.nextLink = `/Modulo/${this.modId}/${next}`;

    // Control de botones
    this.showEmpezar = this.page === 1;
    this.showScratch = this.page === this.scratchPage;
    this.showFinalizar = this.page === this.lastPage;
    this.showAtras = this.page > 1;
    this.showSiguiente = this.page < this.lastPage && this.page > 1;
  }

  /** Abrir Scratch */
  abrirScratch(ev: MouseEvent) {
    ev.preventDefault();

    // 1. Calcula tamaño dinámico basado en la pantalla actual
    const W = Math.round(window.innerWidth * 0.45);  // 45% del ancho de la pantalla
    const H = Math.round(window.innerHeight * 0.50); // 50% del alto de la pantalla

    const scrLeft = window.screenX ?? window.screenLeft ?? 0;
    const scrTop = window.screenY ?? window.screenTop ?? 0;
    const outerW = window.outerWidth || window.innerWidth;
    const outerH = window.outerHeight || window.innerHeight;
    const left = Math.max(0, scrLeft + outerW - W);
    const top = Math.max(0, scrTop + outerH - H);

    const features = [
      `width=${W}`, `height=${H}`,
      `left=${left}`, `top=${top}`,
      'resizable=yes', 'scrollbars=yes', 'menubar=no',
      'toolbar=no', 'location=no', 'status=no'
    ].join(',');

    const miniUrl = this.construirMiniUrl();
    const popup = window.open(miniUrl, 'ventanaGuia', features);

    try { localStorage.setItem('returnTo', window.location.href); } catch { }

    if (popup) {
      try { popup.moveTo(left, top); popup.resizeTo(W, H); } catch { }
      setTimeout(() => {
        try { popup.moveTo(left, top); popup.resizeTo(W, H); } catch { }
      }, 50);
      window.location.assign(this.scratchURL);
    } else {
      window.open(this.scratchURL, '_blank');
      alert('Activa las ventanas emergentes para ver la ventana flotante.');
    }
  }

  private construirMiniUrl(): string {
    const url = new URL(window.location.href);
    url.searchParams.set('mini', '1');
    return url.toString();
  }

  terminarYVolver() {
    const returnTo = localStorage.getItem('returnTo') || '/';
    try {
      if (window.opener && !window.opener.closed) {
        window.opener.location.href = returnTo;
        window.opener.focus();
        window.close();
      } else {
        window.location.href = returnTo;
      }
    } catch {
      window.location.href = returnTo;
    }
  }

  finalizar() {
    // Si endLink viene como '/principal', esto lo deja absoluto
    const baseUrl = window.location.origin;
    const destino = `${baseUrl}${this.endLink}`;

    try {
      if (window.opener && !window.opener.closed) {
        // Redirige SIEMPRE la ventana principal al link de destino
        window.opener.location.href = destino;
        window.opener.focus();
        window.close(); // Cierra el popup
      } else {
        // Si no hay ventana principal, redirige aquí mismo
        window.location.href = destino;
      }
    } catch (err) {
      console.error('Error al cerrar popup o redirigir:', err);
      window.location.href = destino;
    }
  }

  /** Ajuste para modo mini */
  private scaleMiniToFit() {
    const root = document.getElementById('mini-root');
    if (!root) return;

    const DESIGN_W = 690;
    const DESIGN_H = 500;
    const marginW = window.innerWidth * 0.10;
    const marginH = window.innerHeight * 0.10;
    const vw = window.innerWidth - marginW * 2;
    const vh = window.innerHeight - marginH * 2;
    const scale = Math.min(vw / DESIGN_W, vh / DESIGN_H);

    root.style.width = `${DESIGN_W}px`;
    root.style.height = `${DESIGN_H}px`;
    root.style.transform = `scale(${scale})`;
    root.style.position = 'absolute';
    root.style.left = `${marginW + Math.max(0, (vw - DESIGN_W * scale) / 2)}px`;
    root.style.top = `${marginH + Math.max(0, (vh - DESIGN_H * scale) / 2)}px`;
  }
}
