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
  private apiUrl = 'http://localhost:3000/api/etudiants';

  constructor(private http: HttpClient) {}

  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  addEtudiant(etudiant: Partial<Etudiant>): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.apiUrl, etudiant);
  }

  updateEtudiant(id: number, etudiant: Partial<Etudiant>): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/${id}`, etudiant);
  }

  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
