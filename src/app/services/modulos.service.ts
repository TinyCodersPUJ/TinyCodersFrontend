import { Injectable } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ModuleModel } from 'src/app/models/module-model';

@Injectable({
  providedIn: 'root',
})
export class ModulosService {

  constructor(private supabaseService: SupabaseService) {}

  // Obtener la configuración de un módulo específico
  async getModuleConfig(moduleId: number): Promise<ModuleModel | null> {
    const config = await this.supabaseService.getModuleConfig(moduleId);  // Llama al método del servicio Supabase
    return config;  // Retorna la configuración del módulo
  }

  // Obtener todos los módulos
  async getAllModules(): Promise<ModuleModel[] | null> {
    const modules = await this.supabaseService.getAllModules();  // Llama al método del servicio Supabase
    return modules;  // Retorna la lista de módulos
  }

  // Obtener el progreso del usuario (estrellas) en un módulo
  async getUserModuleProgress(userId: string, moduleId: number) {
    const progress = await this.supabaseService.getUserModuleProgress(userId, moduleId);  // Llama al método del servicio Supabase
    return progress;  // Retorna el progreso del usuario (estrellas)
  }

  // Actualizar el progreso del usuario (estrellas)
  async updateUserModuleProgress(moduleId: number, stars: number) {
    const updatedProgress = await this.supabaseService.updateUserModuleProgress(moduleId, stars);  // Llama al método del servicio Supabase
    return updatedProgress;  // Retorna el progreso actualizado
  }
}
