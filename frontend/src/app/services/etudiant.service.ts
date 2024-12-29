import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  classe: string;
}

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  private apiUrl = 'http://localhost:3000/etudiants'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Obtenir la liste des étudiants
  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }
}
