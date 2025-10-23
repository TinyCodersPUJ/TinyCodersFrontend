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
    return this.supabaseClient.auth.signUp({ email, password });
  }

  //Login User
  signIn(email: string, password: string) {
    return this.supabaseClient.auth.signInWithPassword({ email, password });
  }
}
