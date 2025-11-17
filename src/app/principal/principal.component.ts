import { Component, OnInit } from '@angular/core';
import { ModuleModel } from '../models/module-model';
import { ModulosService } from '../services/modulos.service';
import { UserModuleProgressModel } from '../models/user-module-progress-model';
import { SupabaseService } from '../services/supabase.service';
import { ErrorModalService } from '../services/error-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  userId: string | null = '';

  completedModules = 0;

  modules: ModuleModel[] = [];
  userProgress: UserModuleProgressModel[] = [];

  constructor(
    private modulosService: ModulosService,
    private supabaseService: SupabaseService,
    private errorModal: ErrorModalService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadUserId();
    await this.loadModules();
  }

  getStarsDisplay(modId: number): string {
    var stars = 0;
    for (const pro of this.userProgress) {
      if(modId == pro.module_id){
        stars = pro.stars;
      }
    }
    return '★'.repeat(stars) + '✰'.repeat(3 - stars);//⭐'
  }

  getButtonLabel(modId: number): string {
    var stars = 0;
    for (const pro of this.userProgress) {
      if(modId == pro.module_id){
        stars = pro.stars;
      }
    }
    return stars > 0 ? 'Revisar' : 'Empezar';
  }

  private async loadUserId() {
    this.userId = await this.supabaseService.getCurrentUserId();
    console.log('Usuario autenticado:', this.userId);
  }

  // Cargar todos los módulos
  async loadModules() {
    try {
      this.modules = await this.modulosService.getAllModules() || [];
      console.log('Módulos cargados:', this.modules);  // Imprimir los módulos cargados
      this.loadStars();
    } catch (error) {
      console.error('Error loading modules:', error);
      this.errorModal.show("Error cargando los modulos.");
    }
  }

  // Cargar estrellas por modulo
  async loadStars() {
    if (!this.userId) {
      console.warn('❌ No hay usuario autenticado');
      this.errorModal.show("❌ No hay usuario autenticado, no se cargarán datos", '/login');
      return;
    }

    try {
      for (const mod of this.modules) {
        const progress = await this.modulosService.getUserModuleProgress(this.userId ?? '', mod.id);
        const stars = progress?.stars ?? 0;
        console.log('Strellas cargadas:', stars);  // Imprimir los módulos cargados
        this.userProgress.push({
          user_id: this.userId!,
          module_id: mod.id,
          stars: stars
        });

        if(stars > 1){
          this.completedModules++;
        }
      }
    } catch (error) {
      console.error('Error loading stars:', error);
    }
  }

  async logout() {
    const ok = await this.supabaseService.signOut();
    
    if (ok) {
      // Redirige al login
      this.router.navigateByUrl("/login");
    } else {
      this.errorModal.show("❌ Error cerrando sesión.");
    }
  }

}
