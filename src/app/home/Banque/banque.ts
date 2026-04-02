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
  banqueX3Nom?: string;
  banqueTresoNom?: string;
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
  rows: CorrespondanceRow[] = [];
  selectedRowIndex: number | null = null;
  showForm = false;
  saving = false;

  // New correspondance form
  newBanqueX3 = '';
  newBanqueTreso = '';

  toast: { message: string; type: 'success' | 'error' } | null = null;
  private toastTimer: any;

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

  // ngOnInit(): void {
  //   forkJoin({
  //     x3:              this.http.get<any[]>(`${this.apiUrl}/banque/x3`),
  //     treso:           this.http.get<any[]>(`${this.apiUrl}/banque/treso`),
  //     correspondances: this.http.get<any[]>(`${this.apiUrl}/banque/correspondances`),
  //   }).subscribe({
  //     next: ({ x3, treso, correspondances }) => {
  //       this.banquesX3    = x3    ?? [];
  //       this.banquesTreso = treso ?? [];

  //       if (correspondances && correspondances.length > 0) {
  //         this.rows = correspondances.map((d: any) => ({
  //           banqueX3:      d.banqueX3,
  //           banqueTreso:   d.banqueTreso,
  //           banqueX3Nom:   this.getX3Nom(d.banqueX3, x3 ?? []),
  //           banqueTresoNom: this.getTresoNom(d.banqueTreso, treso ?? []),
  //         }));
  //       }
  //       this.cdr.detectChanges();
  //     },
  //     error: () => {
  //       this.showToast('Erreur lors du chargement', 'error');
  //     },
  //   });
  // }

  ngOnInit(): void {
  // Load treso and correspondances immediately (both SQL = fast)
  this.http.get<any[]>(`${this.apiUrl}/banque/treso`).subscribe({
    next: (treso) => {
      this.banquesTreso = treso ?? [];
      this.cdr.detectChanges();
    },
    error: () => {},
  });

  this.http.get<any[]>(`${this.apiUrl}/banque/correspondances`).subscribe({
    next: (correspondances) => {
      if (correspondances && correspondances.length > 0) {
        this.rows = correspondances.map((d: any) => ({
          banqueX3:       d.banqueX3,
          banqueTreso:    d.banqueTreso,
          banqueX3Nom:    d.banqueX3Nom   ?? d.banqueX3,
          banqueTresoNom: d.banqueTresoNom ?? d.banqueTreso,
        }));
      }
      this.cdr.detectChanges();
    },
    error: () => {
      this.showToast('Erreur lors du chargement des correspondances', 'error');
    },
  });

  // Load X3 banks separately (SOAP = slow, doesn't block the list)
  this.http.get<any[]>(`${this.apiUrl}/banque/x3`).subscribe({
    next: (x3) => {
      this.banquesX3 = x3 ?? [];
      // Update names in existing rows once X3 data arrives
      this.rows = this.rows.map(r => ({
        ...r,
        banqueX3Nom: this.getX3Nom(r.banqueX3, x3 ?? []) || r.banqueX3Nom || r.banqueX3,
      }));
      this.cdr.detectChanges();
    },
    error: () => {},
  });
}

  private getX3Nom(code: string, list: any[]): string {
    return list.find(b => b.BAN === code)?.PAB ?? code;
  }

  private getTresoNom(code: string, list: any[]): string {
    return list.find(t => t.CODE === code)?.DESCRIPTION ?? code;
  }

  navigate(route: string) { this.router.navigate([route]); }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  selectRow(index: number): void {
    this.selectedRowIndex = this.selectedRowIndex === index ? null : index;
  }

  deleteSelectedRow(): void {
    if (this.selectedRowIndex === null) return;
    this.rows.splice(this.selectedRowIndex, 1);
    this.selectedRowIndex = null;
    this.saveToBackend();
  }

  openForm(): void {
    this.newBanqueX3 = '';
    this.newBanqueTreso = '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
  }

  addCorrespondance(): void {
    if (!this.newBanqueX3 || !this.newBanqueTreso) {
      this.showToast('Veuillez sélectionner les deux banques', 'error');
      return;
    }

    const exists = this.rows.some(
      r => r.banqueX3 === this.newBanqueX3 && r.banqueTreso === this.newBanqueTreso
    );

    if (exists) {
      this.showToast('Cette correspondance existe déjà', 'error');
      return;
    }

    this.rows.push({
      banqueX3:      this.newBanqueX3,
      banqueTreso:   this.newBanqueTreso,
      banqueX3Nom:   this.getX3Nom(this.newBanqueX3, this.banquesX3),
      banqueTresoNom: this.getTresoNom(this.newBanqueTreso, this.banquesTreso),
    });

    this.closeForm();
    this.saveToBackend();
  }

  private saveToBackend(): void {
    this.saving = true;
    const payload = this.rows.map(r => ({
      banqueX3:    r.banqueX3,
      banqueTreso: r.banqueTreso,
    }));

    this.http.post(`${this.apiUrl}/banque/correspondances`, { correspondances: payload }).subscribe({
      next: () => {
        this.saving = false;
        this.showToast('Correspondances enregistrées avec succès', 'success');
        this.cdr.detectChanges();
      },
      error: () => {
        this.saving = false;
        this.showToast('Erreur lors de la sauvegarde', 'error');
      },
    });
  }

  showToast(message: string, type: 'success' | 'error'): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toast = { message, type };
    this.cdr.detectChanges();
    this.toastTimer = setTimeout(() => {
      this.toast = null;
      this.cdr.detectChanges();
    }, 3500);
  }
}