import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface LibelleDetail {
  type: string;
  libre: string;
  formule: string;
  champ: string;
  nbCara: string;
  formatDate: string;
}

interface LibelleRow {
  flux: string;
  compteBancaire: string;
  details: LibelleDetail[];
  dialogMode: string;
}

@Component({
  selector: 'app-parametrage-libelle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametrage-libelle.html',
  styleUrl: './parametrage-libelle.css',
})
export class ParametrageLibelleComponent implements OnInit {

  private apiUrl = 'http://localhost:3000';

  mode: 'Transaction' | 'Flux' = 'Transaction';
  rows: LibelleRow[] = [];
  showDialog = false;
  selectedRowIndex: number | null = null;
  showDetailPanel = false;
  selectedRowDetails: LibelleDetail[] = [];
  selectedRowFlux = '';

  dialogMode: 'Transaction' | 'Flux' = 'Transaction';
  selectedOperation = '';
  selectedOperationLibelle = '';
  selectedCompte = '';
  details: LibelleDetail[] = [];

  tbType = '';
  tbLibre = '';
  tbAlign = '';
  tbChamp = '';
  tbNbCara = '';
  tbFormatDate = '';

  activePopup: string | null = null;

  operationOptions: { code: string; libelle: string }[] = [];

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

  typeOptions = [
    { key: 'Libre',   value: 'Libre' },
    { key: 'Formule', value: 'Formule' },
    { key: 'Champs',  value: 'Champs' },
  ];

  alignOptions = [
    { key: 'Droit',         value: 'Droit' },
    { key: 'Gauche',        value: 'Gauche' },
    { key: 'NB. occurence', value: 'NB. occurence' },
    { key: 'Format date',   value: 'Format date' },
  ];

  champOptions = [
    { key: 'RG_DATE_OPERATION', value: 'Date opération' },
    { key: 'RG_DATE_VALEUR',    value: 'Date valeur' },
    { key: 'RG_Piece',          value: 'Pièce' },
    { key: 'RG_RefPiece',       value: 'Ref Pièce' },
    { key: 'CG_Num',            value: 'Compte général' },
    { key: 'RG_LIBELLE',        value: 'Libellé' },
    { key: 'CT_Tiers',          value: 'Client' },
    { key: 'CT_Num',            value: 'Code client' },
    { key: 'RG_Reference',      value: 'Référence' },
    { key: 'CMP_CODE',          value: 'Code société' },
    { key: 'N_VERSEMENT',       value: 'Bordereau' },
  ];

  compteOptions = [
    { code: 'B.D.M',      intitule: 'B.D.M' },
    { code: 'CORISBK',    intitule: 'CORISBK' },
    { code: 'CORIS SKO',  intitule: 'CORIS SKO' },
    { code: 'ATLAN KAYE', intitule: 'ATLAN KAYE' },
    { code: 'BCI',        intitule: 'BCI' },
    { code: 'BAM1',       intitule: 'BAM1' },
    { code: 'BOA',        intitule: 'BOA' },
    { code: 'ECOBANK',    intitule: 'ECOBANK' },
    { code: 'BMS',        intitule: 'BMS' },
    { code: 'BIM',        intitule: 'BIM' },
    { code: 'CORPR',      intitule: 'CORPR' },
    { code: 'BDMTR',      intitule: 'BDMTR' },
  ];

  dateFormatOptions = [
    { key: '0', value: 'dd-MM-yyyy' },
    { key: '1', value: 'ddMMyyyy' },
    { key: '2', value: 'dd/MM/yyyy' },
    { key: '3', value: 'yyyyMMdd' },
  ];

  // ── Computed getters ──────────────────────────────
  get showLibreField(): boolean {
    return this.tbType === 'Libre';
  }

  get showAlignField(): boolean {
    return this.tbType === 'Formule';
  }

  get showChampField(): boolean {
    return this.tbType === 'Champs' || this.tbType === 'Formule';
  }

  get showNbCaraField(): boolean {
    return this.tbType === 'Formule' &&
      (this.tbAlign === 'Droit' || this.tbAlign === 'Gauche');
  }

  get showFormatDateField(): boolean {
    return this.tbType === 'Formule' && this.tbAlign === 'Format date';
  }

  canAddDetailRow(): boolean {
    if (!this.tbType) return false;
    if (this.tbType === 'Libre' && !this.tbLibre) return false;
    if (this.tbType === 'Formule') {
      if (!this.tbAlign) return false;
      if (this.tbAlign === 'Format date' && (!this.tbFormatDate || !this.tbChamp)) return false;
    }
    if (this.tbType === 'Champs' && !this.tbChamp) return false;
    return true;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('libelle_rows');
    if (saved) {
      try { this.rows = JSON.parse(saved); } catch { this.rows = []; }
    }

    this.http.get<{ code: string; libelle: string }[]>(
      `${this.apiUrl}/libelle/operations`
    ).subscribe({
      next: (data) => { this.operationOptions = data ?? []; this.cdr.detectChanges(); },
      error: () => {},
    });
  }

  // ── Navigation ────────────────────────────────────
  navigate(route: string) { this.router.navigate([route]); }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // ── Persistence ───────────────────────────────────
  private saveRows(): void {
    localStorage.setItem('libelle_rows', JSON.stringify(this.rows));
  }

  // ── Dialog ────────────────────────────────────────
  openDialog(): void {
    this.dialogMode = 'Transaction';
    this.selectedOperation = '';
    this.selectedOperationLibelle = '';
    this.selectedCompte = '';
    this.details = [];
    this.resetBuilder();
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.activePopup = null;
  }

  // ── Popup ─────────────────────────────────────────
  togglePopup(name: string, event: MouseEvent): void {
    event.stopPropagation();
    this.activePopup = this.activePopup === name ? null : name;
  }

  closePopup(): void { this.activePopup = null; }

  // ── Selectors ─────────────────────────────────────
  selectOperation(code: string, libelle: string): void {
    this.selectedOperation = code;
    this.selectedOperationLibelle = libelle;
    this.activePopup = null;
  }

  selectCompte(intitule: string): void {
    this.selectedCompte = intitule;
    this.activePopup = null;
  }

  selectTbType(key: string): void {
    this.tbType = key;
    this.tbLibre = '';
    this.tbAlign = '';
    this.tbChamp = '';
    this.tbNbCara = '';
    this.tbFormatDate = '';
    this.activePopup = null;
  }

  selectTbAlign(key: string): void {
    this.tbAlign = key;
    this.tbNbCara = '';
    this.tbFormatDate = '';
    this.activePopup = null;
  }

  selectTbChamp(key: string): void {
    this.tbChamp = key;
    this.activePopup = null;
  }

  selectTbFormatDate(value: string): void {
    this.tbFormatDate = value;
    this.activePopup = null;
  }

  // ── Builder ───────────────────────────────────────
  resetBuilder(): void {
    this.tbType = '';
    this.tbLibre = '';
    this.tbAlign = '';
    this.tbChamp = '';
    this.tbNbCara = '';
    this.tbFormatDate = '';
    this.activePopup = null;
  }

  addDetailRow(): void {
    if (!this.canAddDetailRow()) {
      alert('Veuillez remplir les champs obligatoires.');
      return;
    }
    this.details.push({
      type:       this.tbType,
      libre:      this.tbLibre,
      formule:    this.tbAlign,
      champ:      this.tbChamp,
      nbCara:     this.tbNbCara,
      formatDate: this.tbFormatDate,
    });
    this.resetBuilder();
  }

  removeDetailRow(i: number): void {
    this.details.splice(i, 1);
  }

  // ── Main table ────────────────────────────────────
  selectRow(index: number): void {
    if (this.selectedRowIndex === index && this.showDetailPanel) {
      this.showDetailPanel = false;
      this.selectedRowIndex = null;
      return;
    }
    this.selectedRowIndex = index;
    this.selectedRowDetails = this.rows[index]?.details ?? [];
    this.selectedRowFlux = this.rows[index]?.flux ?? '';
    this.showDetailPanel = true;
  }

  deleteSelectedRow(): void {
    if (this.selectedRowIndex !== null && this.rows.length > 0) {
      this.rows.splice(this.selectedRowIndex, 1);
      this.selectedRowIndex = null;
      this.showDetailPanel = false;
      this.selectedRowDetails = [];
      this.saveRows();
    }
  }

  // ── Valider ───────────────────────────────────────
  valider(): void {
    this.rows.push({
      flux: this.selectedOperationLibelle || this.selectedOperation,
      compteBancaire: this.selectedCompte,
      details: [...this.details],
      dialogMode: this.dialogMode,
    });
    this.saveRows();
    this.closeDialog();
  }
}