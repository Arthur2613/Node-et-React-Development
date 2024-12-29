import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EtudiantListComponent {
  etudiants = [
    { id: 1, nom: 'Dupont', prenom: 'Jean', age: 20, classe: 'Informatique' },
    { id: 2, nom: 'Martin', prenom: 'Marie', age: 22, classe: 'Mathématiques' },
    { id: 3, nom: 'Doe', prenom: 'John', age: 19, classe: 'Physique' },
  ];

  // Variables pour le formulaire
  selectedEtudiant: any = null; // Utilisé pour modification ou ajout
  formData = {
    id: 0,
    nom: '',
    prenom: '',
    age: 18,
    classe: '',
  };

  // Méthode pour ajouter ou modifier un étudiant
  saveEtudiant() {
    if (this.formData.id === 0) {
      // Ajout d'un nouvel étudiant
      this.formData.id = this.etudiants.length + 1;
      this.etudiants.push({ ...this.formData }); // Ajoute une copie complète des données
    } else {
      // Modification d'un étudiant existant
      const index = this.etudiants.findIndex((e) => e.id === this.formData.id);
      if (index !== -1) {
        this.etudiants[index] = { ...this.formData };
      }
    }
  }

  // Méthode pour sélectionner un étudiant à modifier
  editEtudiant(etudiant: any) {
    this.formData = { ...etudiant };
  }

  // Méthode pour supprimer un étudiant
  deleteEtudiant(id: number) {
    this.etudiants = this.etudiants.filter((etudiant) => etudiant.id !== id);
  }

  // Réinitialiser le formulaire
  resetForm() {
    this.formData = {
      id: 0,
      nom: '',
      prenom: '',
      age: 18,
      classe: '',
    };
  }
}
