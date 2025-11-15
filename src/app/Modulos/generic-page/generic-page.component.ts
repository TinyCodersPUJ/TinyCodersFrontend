import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModulosService } from 'src/app/services/modulos.service';
import { ModuleModel } from 'src/app/models/module-model';
import { ErrorModalService } from 'src/app/services/error-modal.service';

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

  constructor(private route: ActivatedRoute,
    private modulosService: ModulosService,
    private errorModal: ErrorModalService,
    private router: Router
  ) { }

  ngOnInit() {
    // Leer parámetros dinámicos de la URL
    this.route.paramMap.subscribe(params => {
      this.modId = Number(params.get('modId') || 1);
      this.page = Number(params.get('page') || 1);
      this.loadConfig();
      this.updateContent();
    });

    // Popup scratch
    const urlParams = new URLSearchParams(window.location.search);
    this.esMini = urlParams.get('mini') === '1';

    if (this.esMini) {

      document.body.classList.add('mini');
      setTimeout(() => this.scaleMiniToFit(), 0);
      window.addEventListener('resize', this.resizeHandler);

    }

    const handler = () => {
      const returnTo = localStorage.getItem('returnTo') || '/';
      try {
        if (window.opener && !window.opener.closed) {
          window.opener.location.href = returnTo; // vuelve a la app
          window.opener.focus();
        }
      } catch { }
    };

    // se dispara si el usuario cierra con la X 
    window.addEventListener('beforeunload', handler);
    window.addEventListener('pagehide', handler);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  /** Carga configuración del módulo actual */
  async loadConfig() {
    const config = await this.modulosService.getModuleConfig(this.modId);
    this.lastPage = config?.lastPage || 0;
    this.scratchPage = config?.scratchPage || 0;
    this.scratchURL = `https://hardware-for-education.github.io/Scratch_For_Education?modulo=${config?.scratchFile}`;
    console.log("URL: ", this.scratchURL);
    this.endLink = config?.endLink || '/principal';
  }

  /** Actualiza las imágenes y los botones según la página */
  private updateContent() {
    this.imgSrc = `assets/img/Modulo${this.modId}/M${this.modId}P${this.page}.png`;

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
    if (!this.scratchURL) {
      this.errorModal.show("Error: El módulo no tiene Scratch configurado.");
      return;
    }

    ev.preventDefault();

    const width = window.screen.availWidth;
    const height = window.screen.availHeight;

    // Abre la ventana de Scratch desde el popup mini
    const scratchWindow = window.open(this.scratchURL, 'scratchWin',
      `width=${width},height=${height},left=0,top=0,resizable=yes,scrollbars=yes`);

    // Monitorea si Scratch se cierra
    const checkScratchClosed = setInterval(() => {
      if (scratchWindow && scratchWindow.closed) {
        clearInterval(checkScratchClosed);
        try {
          if (window.opener && !window.opener.closed) {
            window.opener.location.reload(); // recarga la principal
            window.close(); // cierra el popup
          } else {
            this.router.navigateByUrl(this.nextLink);
            //window.location.href = this.nextLink; //'/principal'
          }
        } catch {
          window.close();
        }
      }
    }, 1000);

    if (!scratchWindow) {
      window.open(this.scratchURL, '_blank');
      alert('Activa las ventanas emergentes para ver la ventana flotante.');
    }

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

  async finalizar() {
    if (this.esMini) {
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
        this.errorModal.show("Error al cerrar popup o redirigir");
        window.location.href = destino;
      }
    }

    // Actualizar progreso
    await this.modulosService.updateUserModuleProgress(this.modId, 3);
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
