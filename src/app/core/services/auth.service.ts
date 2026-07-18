import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'cronos_users';

  // Obtener lista de usuarios registrados
  private getUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Registrar un nuevo usuario
  registerUser(username: string, password: string): boolean {
    const users = this.getUsers();
    // Verificamos si el usuario ya existe
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      return false; // Ya existe
    }
    
    users.push({ username, password });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true; // Registro exitoso
  }

  // Validar credenciales
  loginUser(username: string, password: string): boolean {
    // Mantenemos tu usuario 'admin' por defecto como comodín de emergencia
    if (username === 'admin' && password === '1234') return true;
    
    const users = this.getUsers();
    return users.some(u => u.username === username && u.password === password);
  }
}