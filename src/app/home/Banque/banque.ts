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










// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';

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

//   menuItems = [
//     { label: 'Connexion', route: 'connexion' },
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
//     private http: HttpClient,
//     private authService: AuthService,
//     private router: Router,
//   ) {}

//   // ngOnInit(): void {
//   //   this.http.get<any[]>(`${this.apiUrl}/banque/x3`).subscribe({
//   //     next: (data) => { this.banquesX3 = data ?? []; this.loadingX3 = false; },
//   //     error: () => { this.loadingX3 = false; },
//   //   });
//   //   this.http.get<any[]>(`${this.apiUrl}/banque/treso`).subscribe({
//   //     next: (data) => { this.banquesTreso = data ?? []; this.loadingTreso = false; },
//   //     error: () => { this.loadingTreso = false; },
//   //   });
//   //   this.http.get<any[]>(`${this.apiUrl}/banque/correspondances`).subscribe({
//   //     next: (data) => {
//   //       if (data && data.length > 0)
//   //         this.rows = data.map(d => ({ banqueX3: d.banqueX3, banqueTreso: d.banqueTreso }));
//   //     },
//   //     error: () => {},
//   //   });
//   // }

// ngOnInit(): void {
//   // Start both as false — show table immediately
//   this.loadingX3 = false;
//   this.loadingTreso = false;

//   this.http.get<any[]>(`${this.apiUrl}/banque/x3`).subscribe({
//     next: (data) => {
//       this.banquesX3 = data ?? [];
//       console.log('banquesX3:', this.banquesX3.length);
//     },
//     error: (err) => {
//       console.error('banque/x3 error:', err);
//     },
//   });

//   this.http.get<any[]>(`${this.apiUrl}/banque/treso`).subscribe({
//     next: (data) => {
//       this.banquesTreso = data ?? [];
//       console.log('banquesTreso:', this.banquesTreso.length);
//     },
//     error: (err) => {
//       console.error('banque/treso error:', err);
//     },
//   });

//   this.http.get<any[]>(`${this.apiUrl}/banque/correspondances`).subscribe({
//     next: (data) => {
//       if (data && data.length > 0)
//         this.rows = data.map(d => ({ banqueX3: d.banqueX3, banqueTreso: d.banqueTreso }));
//     },
//     error: () => {},
//   });
// }

//   navigate(route: string) { this.router.navigate([route]); }

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/']);
//   }

//   addRow(): void { this.rows.push({ banqueX3: '', banqueTreso: '' }); }

//   removeRow(index: number): void {
//     if (this.rows.length > 1) this.rows.splice(index, 1);
//   }

//   annuler(): void { this.rows = [{ banqueX3: '', banqueTreso: '' }]; }

//   valider(): void {
//     const valid = this.rows.filter(r => r.banqueX3 && r.banqueTreso);
//     if (!valid.length) return;
//     this.saving = true;
//     this.http.post(`${this.apiUrl}/banque/correspondances`, { correspondances: valid }).subscribe({
//       next: () => { this.saving = false; alert('Correspondances enregistrées !'); },
//       error: () => { this.saving = false; alert('Erreur lors de la sauvegarde'); },
//     });
//   }
// }














import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { forkJoin } from 'rxjs';

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
  saving = false;

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
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // this.http.get<any[]>(`${this.apiUrl}/banque/x3`).subscribe({
    //   next: (data) => {
    //     this.banquesX3 = data ?? [];
    //     this.cdr.detectChanges();
    //   },
    //   error: () => {},
    // });

    // this.http.get<any[]>(`${this.apiUrl}/banque/treso`).subscribe({
    //   next: (data) => {
    //     this.banquesTreso = data ?? [];
    //     this.cdr.detectChanges();
    //   },
    //   error: () => {},
    // });

    // this.http.get<any[]>(`${this.apiUrl}/banque/correspondances`).subscribe({
    //   next: (data) => {
    //     if (data && data.length > 0) {
    //       this.rows = data.map(d => ({ banqueX3: d.banqueX3, banqueTreso: d.banqueTreso }));
    //       this.cdr.detectChanges();
    //     }
    //   },
    //   error: () => {},
    // });
    forkJoin({
    x3: this.http.get<any[]>(`${this.apiUrl}/banque/x3`),
    treso: this.http.get<any[]>(`${this.apiUrl}/banque/treso`),
    correspondances: this.http.get<any[]>(`${this.apiUrl}/banque/correspondances`),
  }).subscribe({
    next: ({ x3, treso, correspondances }) => {
      this.banquesX3 = x3 ?? [];
      this.banquesTreso = treso ?? [];
      if (correspondances && correspondances.length > 0) {
        this.rows = correspondances.map((d: any) => ({
          banqueX3: d.banqueX3,
          banqueTreso: d.banqueTreso,
        }));
      }
      this.cdr.detectChanges();
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
  removeRow(i: number): void { if (this.rows.length > 1) this.rows.splice(i, 1); }
  annuler(): void { this.rows = [{ banqueX3: '', banqueTreso: '' }]; }

  valider(): void {
    const valid = this.rows.filter(r => r.banqueX3 && r.banqueTreso);
    if (!valid.length) return;
    this.saving = true;
    this.http.post(`${this.apiUrl}/banque/correspondances`, { correspondances: valid }).subscribe({
      next: () => {
        this.saving = false;
        alert('Correspondances enregistrées !');
        this.cdr.detectChanges();
      },
      error: () => {
        this.saving = false;
        alert('Erreur lors de la sauvegarde');
      },
    });
  }
}