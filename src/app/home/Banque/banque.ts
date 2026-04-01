// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// interface CorrespondanceRow {
//   banqueX3: string;
//   banqueTreso: string;
// }

// @Component({
//   selector: 'app-banque',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './banque.html',
//   styleUrl: './banque.css',
// })
// export class BanqueComponent implements OnInit {
//   private apiUrl = 'http://localhost:3000';

//   banquesX3: any[] = [];
//   banquesTreso: any[] = [];
//   rows: CorrespondanceRow[] = [{ banqueX3: '', banqueTreso: '' }];

//   loadingX3 = true;
//   loadingTreso = true;
//   saving = false;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.http.get<any[]>(`${this.apiUrl}/banque/x3`).subscribe({
//       next: (data) => { this.banquesX3 = data ?? []; this.loadingX3 = false; },
//       error: () => { this.loadingX3 = false; },
//     });

//     this.http.get<any[]>(`${this.apiUrl}/banque/treso`).subscribe({
//       next: (data) => { this.banquesTreso = data ?? []; this.loadingTreso = false; },
//       error: () => { this.loadingTreso = false; },
//     });

//     this.http.get<any[]>(`${this.apiUrl}/banque/correspondances`).subscribe({
//       next: (data) => {
//         if (data && data.length > 0) {
//           this.rows = data.map(d => ({ banqueX3: d.banqueX3, banqueTreso: d.banqueTreso }));
//         }
//       },
//       error: () => {},
//     });
//   }

//   addRow(): void {
//     this.rows.push({ banqueX3: '', banqueTreso: '' });
//   }

//   removeRow(index: number): void {
//     if (this.rows.length > 1) this.rows.splice(index, 1);
//   }

//   annuler(): void {
//     this.rows = [{ banqueX3: '', banqueTreso: '' }];
//   }

//   // valider(): void {
//   //   const valid = this.rows.filter(r => r.banqueX3 && r.banqueTreso);
//   //   if (!valid.length) return;
//   //   this.saving = true;
//   //   this.http.post(`${this.apiUrl}/banque/correspondances`, { correspondances: valid }).subscribe({
//   //     next: () => { this.saving = false; },
//   //     error: () => { this.saving = false; },
//   //   });
//   // }

//   valider(): void {
//   const valid = this.rows.filter(r => r.banqueX3 && r.banqueTreso);
//   if (!valid.length) return;
//   this.saving = true;
//   this.http.post(`${this.apiUrl}/banque/correspondances`, { correspondances: valid }).subscribe({
//     next: () => {
//       this.saving = false;
//       alert('Correspondances enregistrées avec succès !');
//     },
//     error: () => {
//       this.saving = false;
//       alert('Erreur lors de la sauvegarde');
//     },
//   });
// }
// }










import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface CorrespondanceRow {
  banqueX3: string;
  banqueTreso: string;
}

@Component({
  selector: 'app-banque',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banque.html',
  styleUrl: './banque.css',
})
export class BanqueComponent implements OnInit {
  private apiUrl = 'http://localhost:3000';

  banquesX3: any[] = [];
  banquesTreso: any[] = [];
  rows: CorrespondanceRow[] = [{ banqueX3: '', banqueTreso: '' }];
  loadingX3 = true;
  loadingTreso = true;
  saving = false;

  menuItems = [
    { label: 'Connexion', route: 'connexion' },
    { label: 'Configuration', route: '/config' },
    {
      label: 'Paramétrage Correspondance',
      children: [
        { label: 'Devise',              route: '/devise' },
        { label: 'Banque',              route: '/banque' },
        { label: 'Compte Bancaire',     route: '/compte' },
        { label: 'Flux',                route: '/flux' },
        { label: 'Paramétrage Libellé', route: '/libelle' },
      ],
    },
    { label: 'Traitement', route: '/traitement' },
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${this.apiUrl}/banque/x3`).subscribe({
      next: (data) => { this.banquesX3 = data ?? []; this.loadingX3 = false; },
      error: () => { this.loadingX3 = false; },
    });
    this.http.get<any[]>(`${this.apiUrl}/banque/treso`).subscribe({
      next: (data) => { this.banquesTreso = data ?? []; this.loadingTreso = false; },
      error: () => { this.loadingTreso = false; },
    });
    this.http.get<any[]>(`${this.apiUrl}/banque/correspondances`).subscribe({
      next: (data) => {
        if (data && data.length > 0)
          this.rows = data.map(d => ({ banqueX3: d.banqueX3, banqueTreso: d.banqueTreso }));
      },
      error: () => {},
    });
  }

  navigate(route: string) { this.router.navigate([route]); }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  addRow(): void { this.rows.push({ banqueX3: '', banqueTreso: '' }); }

  removeRow(index: number): void {
    if (this.rows.length > 1) this.rows.splice(index, 1);
  }

  annuler(): void { this.rows = [{ banqueX3: '', banqueTreso: '' }]; }

  valider(): void {
    const valid = this.rows.filter(r => r.banqueX3 && r.banqueTreso);
    if (!valid.length) return;
    this.saving = true;
    this.http.post(`${this.apiUrl}/banque/correspondances`, { correspondances: valid }).subscribe({
      next: () => { this.saving = false; alert('Correspondances enregistrées !'); },
      error: () => { this.saving = false; alert('Erreur lors de la sauvegarde'); },
    });
  }
}