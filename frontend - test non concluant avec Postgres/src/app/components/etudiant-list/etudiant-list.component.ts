import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import du FormsModule

@Component({
  standalone: true,
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css'],
  imports: [FormsModule], // Ajoutez FormsModule ici
})

export class EtudiantListComponent implements OnInit {
  etudiants: Etudiant[] = [];
  formData: Partial<Etudiant> = { id: 0, nom: '', prenom: '', age: null, classe: '' };

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe((data) => {
      this.etudiants = data;
    });
  }

  saveEtudiant(): void {
    if (!this.formData.id) {
      // Ajouter un étudiant
      this.etudiantService.addEtudiant(this.formData).subscribe((newEtudiant) => {
        this.etudiants.push(newEtudiant);
        this.resetForm();
      });
    } else {
      // Modifier un étudiant
      this.etudiantService.updateEtudiant(this.formData.id, this.formData).subscribe((updatedEtudiant) => {
        const index = this.etudiants.findIndex((e) => e.id === updatedEtudiant.id);
        if (index !== -1) {
          this.etudiants[index] = updatedEtudiant;
        }
        this.resetForm();
      });
    }
  }

  editEtudiant(etudiant: Etudiant): void {
    this.formData = { ...etudiant };
  }

  deleteEtudiant(id: number): void {
    this.etudiantService.deleteEtudiant(id).subscribe(() => {
      this.etudiants = this.etudiants.filter((e) => e.id !== id);
    });
  }

  resetForm(): void {
    this.formData = { id: 0, nom: '', prenom: '', age: null, classe: '' };
  }
}

