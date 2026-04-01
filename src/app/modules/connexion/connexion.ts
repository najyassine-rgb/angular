// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { SocieteService } from '../../societe.service';

// @Component({
//   selector: 'app-connexion',
//   templateUrl: './connexion.html',
//   imports: [CommonModule, FormsModule],
//   styleUrls: ['./connexion.css'],
// })
// export class ConnexionComponent implements OnInit {
//   societes: any[] = [];
//   selectedSociete = '';
//   loading = false;
//   errorMessage = '';

//   constructor(
//     private societeService: SocieteService,
//     private router: Router,
//   ) {}

//   ngOnInit() {
//     this.loadSocietes();
//   }

//   loadSocietes() {
//     this.loading = true;
//     this.societeService.getSocietes().subscribe({
//       next: (data) => {
//         this.societes = data;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Erreur chargement sociétés', err);
//         this.errorMessage = 'Impossible de charger les sociétés';
//         this.loading = false;
//       },
//     });
//   }

//   close() {
//     this.router.navigate(['/home']);
//   }

//   cancel() {
//     this.router.navigate(['/home']);
//   }

//   validate() {
//     if (!this.selectedSociete) {
//       this.errorMessage = 'Veuillez sélectionner une société';
//       return;
//     }
//     localStorage.setItem('societe', this.selectedSociete);
//     this.router.navigate(['/home']);
//   }
// }


// ----------------------------------------------------------


// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { SocieteService } from '../../societe.service';
// import { AuthService } from '../../auth/auth.service';

// @Component({
//   selector: 'app-connexion',
//   templateUrl: './connexion.html',
//   imports: [CommonModule, FormsModule],
//   styleUrls: ['./connexion.css'],
// })
// export class ConnexionComponent implements OnInit {
//   societes: any[] = [];
//   selectedSociete = '';
//   loading = false;
//   errorMessage = '';

//   menuItems = [
//     { label: 'Connexion', route: '/connexion' },
//     { label: 'Configuration', route: '/config' },
//     {
//       label: 'Paramétrage Correspondance',
//       children: [
//         { label: 'Devise',              route: '/devise' },
//         { label: 'Banque',              route: '/banque' },
//         { label: 'Compte Bancaire',     route: '/compte' },
//         { label: 'Flux',                route: '/flux' },
//         { label: 'Paramétrage Libellé', route: '/libelle' },
//       ],
//     },
//     { label: 'Traitement', route: '/traitement' },
//   ];

//   constructor(
//     private societeService: SocieteService,
//     private authService: AuthService,
//     private router: Router,
//   ) {}

//   // ngOnInit() {
//   //   this.loadSocietes();
//   // }

//   ngOnInit() {
//   this.loading = true;
//   this.errorMessage = '';
//   this.societeService.getSocietes().subscribe({
//     next: (data) => {
//       this.societes = data ?? [];
//       this.loading = false;
//       if (this.societes.length === 0) {
//         this.errorMessage = 'Aucune société disponible';
//       }
//     },
//     error: () => {
//       this.loading = false;
//       this.errorMessage = 'Impossible de charger les sociétés';
//     },
//   });
// }

//   loadSocietes() {
//     this.loading = true;
//     this.societeService.getSocietes().subscribe({
//       next: (data) => { this.societes = data; this.loading = false; },
//       error: (err) => {
//         console.error('Erreur chargement sociétés', err);
//         this.errorMessage = 'Impossible de charger les sociétés';
//         this.loading = false;
//       },
//     });
//   }

//   navigate(route: string) {
//     this.router.navigate([route]);
//   }

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/']);
//   }

//   close() {
//     this.router.navigate(['/home']);
//   }

//   validate() {
//     if (!this.selectedSociete) {
//       this.errorMessage = 'Veuillez sélectionner une société';
//       return;
//     }
//     localStorage.setItem('societe', this.selectedSociete);
//     this.router.navigate(['/home']);
//   }
// }







import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SocieteService } from '../../societe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css'],
})
export class ConnexionComponent implements OnInit {
  societes: any[] = [];
  selectedSociete = '';
  loading = true;
  errorMessage = '';

  // menuItems = [
  //   { label: 'Connexion', route: '/connexion' },
  //   { label: 'Configuration', route: '/config' },
  //   {
  //     label: 'Paramétrage Correspondance',
  //     children: [
  //       { label: 'Devise',              route: '/devise' },
  //       { label: 'Banque',              route: '/banque' },
  //       { label: 'Compte Bancaire',     route: '/compte' },
  //       { label: 'Flux',                route: '/flux' },
  //       { label: 'Paramétrage Libellé', route: '/libelle' },
  //     ],
  //   },
  //   { label: 'Traitement', route: '/traitement' },
  // ];

  menuItems = [
  { label: 'Connexion', route: '/connexion' },
  { label: 'Configuration', route: '/config' },
  {
    label: 'Correspondance',
    children: [
      { label: 'Devise',          route: '/devise' },
      { label: 'Banque',          route: '/banque' },
      { label: 'Compte Bancaire', route: '/compte' },
      { label: 'Flux',            route: '/flux' },
    ],
  },
  {
    label: 'Paramétrage',
    children: [
      { label: 'Paramétrage Libellé', route: '/libelle' },
    ],
  },
  { label: 'Traitement', route: '/traitement' },
];

  constructor(
    private societeService: SocieteService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.societeService.getSocietes().subscribe({
      next: (data) => {
        this.societes = data ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Impossible de charger les sociétés';
        this.cdr.detectChanges();
      },
    });
  }

  navigate(route: string) { this.router.navigate([route]); }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  close() { this.router.navigate(['/home']); }

  validate() {
    if (!this.selectedSociete) {
      this.errorMessage = 'Veuillez sélectionner une société';
      return;
    }
    localStorage.setItem('societe', this.selectedSociete);
    this.router.navigate(['/home']);
  }
}