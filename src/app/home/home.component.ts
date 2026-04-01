import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  //   menuItems: string[] = ['Connexion', 'Configuration', 'Paramétrage Correspondance', 'Traitement'];
 
 
  menuItems = [
    // { label: 'Connexion', route: '/home' },
    { label: 'Connexion', route: '/connexion' },
    { label: 'Configuration', route: '/config' },
    {
      label: 'Paramétrage Correspondance',
      children: [
        { label: 'Devise', route: '/devise' },
        { label: 'Banque', route: '/banque' },
        { label: 'Compte Bancaire', route: '/compte' },
        { label: 'Flux', route: '/flux' },
        { label: 'Paramétrage Libellé', route: '/libelle' },
      ],
    },
    { label: 'Traitement', route: '/traitement' },
  ];



// menuItems = [
//   { label: 'Connexion', route: '/home/connexion' },
//   { label: 'Configuration', route: '/config' },
//   {
//     label: 'Paramétrage Correspondance',
//     children: [
//       { label: 'Devise',              route: '/home/devise' },
//       { label: 'Banque',              route: '/home/banque' },
//       { label: 'Compte Bancaire',     route: '/home/compte' },
//       { label: 'Flux',                route: '/home/flux' },
//       { label: 'Paramétrage Libellé', route: '/home/libelle' },
//     ],
//   },
//   { label: 'Traitement', route: '/traitement' },
// ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // 🚀 (OPTIONNEL) navigation dynamique
  //   navigate(item: string) {
  //     console.log('Clicked:', item);
  //   }
  navigate(route: string) {
    this.router.navigate([route]);
  }
}
