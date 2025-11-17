import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseClient: SupabaseClient;
  constructor() {
    this.supabaseClient = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  //Register User
  signUp(email: string, password: string) {
    return this.supabaseClient.auth.signUp({ email, password, options: {
      emailRedirectTo: 'https://tinycoderspuj.github.io/TinyCodersFrontend/login'
    } });
  }

  //Login User
  signIn(email: string, password: string) {
    return this.supabaseClient.auth.signInWithPassword({ email, password });
  }

  // Cerrar sesion User
  async signOut() {
    const { error } = await this.supabaseClient.auth.signOut();
    if (error) console.error("Error al cerrar sesión:", error);
    return !error;
  }


  // Obtener la configuración de un módulo específico
  async getModuleConfig(moduleId: number) {
    const { data, error } = await this.supabaseClient
      .from('modules')  // Se asume que la tabla se llama 'modules'
      .select('id, name, cover, href, lastPage, scratchPage, scratchFile, endLink')
      .eq('id', moduleId)
      .single();  // Obtener solo un módulo (un solo resultado)

    if (error) {
      console.error('Error fetching module config:', error);
      return null;
    }

    return data; // Retorna la configuración del módulo
  }

  // Obtener todos los módulos
  async getAllModules() {
    const { data, error } = await this.supabaseClient
      .from('modules')  // Consulta a la tabla 'modules'
      .select('id, name, cover, href, lastPage, scratchPage, scratchFile, endLink')
      .lt('id', 100)
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching all modules:', error);
      return null;
    }

    return data; // Retorna todos los módulos
  }

  // Obtener el progreso de un usuario en un módulo (estrellas)
  async getUserModuleProgress(userId: string, moduleId: number) {
    const { data, error } = await this.supabaseClient
      .from('user_module_progress')  // Se asume que la tabla se llama 'user_module_progress'
      .select('stars')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .maybeSingle();  // Obtener solo un registro

    if (error) {
      console.error('Error fetching user module progress:', error);
      return null;
    }

    return data; // Retorna las estrellas del usuario en ese módulo
  }

  // Actualizar el progreso del usuario (estrellas) en un módulo
  async updateUserModuleProgress(moduleId: number, stars: number) {
    const userId = await this.getCurrentUserId();
    const { data, error } = await this.supabaseClient
      .from('user_module_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        stars: stars,  // Asignar las estrellas
      },
        { onConflict: 'user_id,module_id' }
      );

    if (error) {
      console.error('Error updating user module progress:', error);
      return null;
    }

    return data; // Retorna los datos actualizados
  }

  // Obtener el usuario autenticado actual
  async getCurrentUserId(): Promise<string | null> {
    try {
      const { data, error } = await this.supabaseClient.auth.getUser();

      if (error) {
        console.error('Error obteniendo usuario actual:', error.message);
        return null;
      }

      const userId = data.user?.id || null;
      console.log('🧩 ID del usuario autenticado:', userId);
      return userId;
    } catch (err) {
      console.error('Error inesperado al obtener usuario:', err);
      return null;
    }
  }

}
