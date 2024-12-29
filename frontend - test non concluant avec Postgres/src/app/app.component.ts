import { Component } from '@angular/core';
import { EtudiantListComponent } from './components/etudiant-list/etudiant-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [EtudiantListComponent], // Import the standalone component here
})
export class AppComponent {
  title = 'frontend';
}
