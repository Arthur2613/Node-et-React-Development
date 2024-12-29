import { Component } from '@angular/core';
import { EtudiantListComponent } from './components/etudiant-list/etudiant-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [EtudiantListComponent], // Import du composant standalone
})
export class AppComponent {
  title = 'frontend';
}

