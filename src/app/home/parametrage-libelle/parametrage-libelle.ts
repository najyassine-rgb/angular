// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface LibelleDetail {
//   type: string;
//   libre: string;
//   formule: string;
//   champ: string;
//   nbCara: string;
//   formatDate: string;
// }

// interface LibelleRow {
//   flux: string;
//   compteBancaire: string;
// }

// @Component({
//   selector: 'app-parametrage-libelle',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './parametrage-libelle.html',
//   styleUrl: './parametrage-libelle.css',
// })
// export class ParametrageLibelleComponent {

//   mode: 'Transaction' | 'Flux' = 'Transaction';
//   rows: LibelleRow[] = [{ flux: '', compteBancaire: '' }];
//   showDialog = false;

//   // Dialog state
//   dialogMode: 'Transaction' | 'Flux' = 'Transaction';
//   selectedOperation = '';
//   selectedCompte = '';
//   details: LibelleDetail[] = [
//     { type: '', libre: '', formule: '', champ: '', nbCara: '', formatDate: '' }
//   ];

//   // Toolbar row
//   tbType = '';
//   tbLibre = '';
//   tbAlign = '';
//   tbChamp = '';

//   // Popup visibility
//   activePopup: string | null = null;
//   activeDetailIndex: number | null = null;
//   activeDetailField: string | null = null;

//   // Data
//   typeOptions = [
//     { key: 'Libre', value: 'Libre' },
//     { key: 'Formule', value: 'Formule' },
//     { key: 'Champs', value: 'Champs' },
//   ];

//   alignOptions = [
//     { key: 'Droit', value: 'Droit' },
//     { key: 'Gauche', value: 'Gauche' },
//     { key: 'NB. occurence', value: 'NB. occurence' },
//     { key: 'Format date', value: 'Format date' },
//   ];

//   champOptions = [
//     { key: 'RG_DATE_OPERATION', value: 'Date opération' },
//     { key: 'RG_DATE_VALEUR', value: 'Date valeur' },
//     { key: 'RG_Piece', value: 'Pièce' },
//     { key: 'RG_RefPiece', value: 'Ref Pièce' },
//     { key: 'CG_Num', value: 'Compte général' },
//     { key: 'RG_LIBELLE', value: 'Libellé' },
//     { key: 'CT_Tiers', value: 'Client' },
//     { key: 'CT_Num', value: 'Code client' },
//     { key: 'RG_Reference', value: 'Référence' },
//     { key: 'CMP_CODE', value: 'Code société' },
//     { key: 'N_VERSEMENT', value: 'Bordereau' },
//   ];

//   operationOptions = [
//     { key: 'AVTR', value: 'AVAL DE TRAITE' },
//     { key: 'AVTD', value: 'AVAL TRAITE EN DEVISE' },
//     { key: 'DELT', value: 'CREDIT MLT' },
//     { key: 'CCT', value: 'CREDIT CT' },
//     { key: 'ESC', value: 'ESCOMPTE' },
//     { key: 'LC', value: 'LETTRE DE CREDIT' },
//     { key: 'LG', value: 'LETTRE DE GARANTIE' },
//     { key: 'PLCT', value: 'PLACEMENT DAP' },
//     { key: 'BAB', value: 'VIREMENT BAB' },
//   ];

//   compteOptions = [
//     { key: 'B.D.M', value: 'B.D.M' },
//     { key: 'CORISBK', value: 'CORISBK' },
//     { key: 'CORIS SKO', value: 'CORIS SKO' },
//     { key: 'ATLAN KAYE', value: 'ATLAN KAYE' },
//     { key: 'BCI', value: 'BCI' },
//     { key: 'BAM1', value: 'BAM1' },
//     { key: 'BOA', value: 'BOA' },
//     { key: 'ECOBANK', value: 'ECOBANK' },
//     { key: 'BMS', value: 'BMS' },
//     { key: 'BIM', value: 'BIM' },
//     { key: 'CORPR', value: 'CORPR' },
//     { key: 'BDMTR', value: 'BDMTR' },
//   ];

//   fluxOperationOptions = [
//     { key: 'RAGC', value: 'AGIOS CREDITEURS' },
//     { key: 'RAPC', value: 'ANNULATION PREAVIS ...' },
//     { key: 'RCHO', value: 'CHEQUE COFFRE' },
//     { key: 'RCHI', value: 'REGLEMENT CHEQUE I...' },
//     { key: 'RDEP', value: 'EXTOURNE DEPOSIT' },
//     { key: 'RDIV', value: 'RECETTES DIVERSES' },
//     { key: 'RESP', value: 'VERSEMENT ESPECE' },
//     { key: 'RFC',  value: 'FACTURE CLIENT NON ...' },
//     { key: 'RVIE', value: 'VIREMENT RECU ETRAN...' },
//     { key: 'RVIR', value: 'VIREMENT LOCAL RECU' },
//     { key: 'DAGD', value: 'AGIOS DEBITEURS' },
//     { key: 'DAPR', value: 'APPROVISIONNEMENT ...' },
//     { key: 'RCHO_C', value: 'CHEQUE EMIS' },
//     { key: 'RETR', value: 'RETRAIT ESPECE' },
//     { key: 'TRAV', value: 'TRAITE AVALISE' },
//     { key: 'REGF', value: 'Réglement espèce forcé' },
//     { key: 'VESP', value: 'VERSEMENT ESPECE' },
//     { key: 'ENCS1', value: 'ENCAISSEMENTS SANS SUPPORT' },
//     { key: 'ENCS2', value: 'ENCAISSEMENTS SANS SUPPORT' },
//     { key: 'ENCS3', value: 'ENCAISSEMENTS SANS SUPPORT' },
//   ];

//   get currentOperationOptions() {
//     return this.dialogMode === 'Flux' ? this.fluxOperationOptions : this.operationOptions;
//   }

//   openDialog(): void {
//     this.dialogMode = 'Transaction';
//     this.selectedOperation = '';
//     this.selectedCompte = '';
//     this.details = [{ type: '', libre: '', formule: '', champ: '', nbCara: '', formatDate: '' }];
//     this.tbType = ''; this.tbLibre = ''; this.tbAlign = ''; this.tbChamp = '';
//     this.activePopup = null;
//     this.showDialog = true;
//   }

//   closeDialog(): void {
//     this.showDialog = false;
//     this.activePopup = null;
//   }

//   togglePopup(name: string, event: MouseEvent): void {
//     event.stopPropagation();
//     this.activePopup = this.activePopup === name ? null : name;
//   }

//   toggleDetailPopup(field: string, index: number, event: MouseEvent): void {
//     event.stopPropagation();
//     const key = `detail_${field}_${index}`;
//     this.activePopup = this.activePopup === key ? null : key;
//     this.activeDetailIndex = index;
//     this.activeDetailField = field;
//   }

//   selectOperation(key: string): void {
//     this.selectedOperation = key;
//     this.activePopup = null;
//   }

//   selectCompte(key: string): void {
//     this.selectedCompte = key;
//     this.activePopup = null;
//   }

//   selectTbType(key: string): void {
//     this.tbType = key;
//     this.activePopup = null;
//   }

//   selectTbAlign(key: string): void {
//     this.tbAlign = key;
//     this.activePopup = null;
//   }

//   selectTbChamp(key: string): void {
//     this.tbChamp = key;
//     this.activePopup = null;
//   }

//   selectDetailField(key: string): void {
//     if (this.activeDetailIndex !== null && this.activeDetailField !== null) {
//       (this.details[this.activeDetailIndex] as any)[this.activeDetailField] = key;
//     }
//     this.activePopup = null;
//   }

//   addDetailRow(): void {
//     this.details.push({ type: '', libre: '', formule: '', champ: '', nbCara: '', formatDate: '' });
//   }

//   removeDetailRow(i: number): void {
//     if (this.details.length > 1) this.details.splice(i, 1);
//   }

//   deleteMainRow(i: number): void {
//     if (this.rows.length > 1) this.rows.splice(i, 1);
//   }

// valider(): void {
//     const opLabel = this.currentOperationOptions.find(
//       o => o.key === this.selectedOperation
//     )?.value ?? this.selectedOperation;

//     this.rows.push({
//       flux: opLabel,
//       compteBancaire: this.selectedCompte,
//     });
//     this.closeDialog();
//   }

//   closePopup(): void {
//     this.activePopup = null;
//   }

//   getLabel(options: { key: string; value: string }[], key: string): string {
//     return options.find(o => o.key === key)?.value ?? key;
//   }
// }













import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
}

@Component({
  selector: 'app-parametrage-libelle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametrage-libelle.html',
  styleUrl: './parametrage-libelle.css',
})
export class ParametrageLibelleComponent {

  mode: 'Transaction' | 'Flux' = 'Transaction';
  rows: LibelleRow[] = [{ flux: '', compteBancaire: '' }];
  showDialog = false;

  dialogMode: 'Transaction' | 'Flux' = 'Transaction';
  selectedOperation = '';
  selectedCompte = '';
  details: LibelleDetail[] = [
    { type: '', libre: '', formule: '', champ: '', nbCara: '', formatDate: '' }
  ];

  tbType = '';
  tbLibre = '';
  tbAlign = '';
  tbChamp = '';

  activePopup: string | null = null;
  activeDetailIndex: number | null = null;
  activeDetailField: string | null = null;

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

  typeOptions = [
    { key: 'Libre', value: 'Libre' },
    { key: 'Formule', value: 'Formule' },
    { key: 'Champs', value: 'Champs' },
  ];

  alignOptions = [
    { key: 'Droit', value: 'Droit' },
    { key: 'Gauche', value: 'Gauche' },
    { key: 'NB. occurence', value: 'NB. occurence' },
    { key: 'Format date', value: 'Format date' },
  ];

  champOptions = [
    { key: 'RG_DATE_OPERATION', value: 'Date opération' },
    { key: 'RG_DATE_VALEUR', value: 'Date valeur' },
    { key: 'RG_Piece', value: 'Pièce' },
    { key: 'RG_RefPiece', value: 'Ref Pièce' },
    { key: 'CG_Num', value: 'Compte général' },
    { key: 'RG_LIBELLE', value: 'Libellé' },
    { key: 'CT_Tiers', value: 'Client' },
    { key: 'CT_Num', value: 'Code client' },
    { key: 'RG_Reference', value: 'Référence' },
    { key: 'CMP_CODE', value: 'Code société' },
    { key: 'N_VERSEMENT', value: 'Bordereau' },
  ];

  operationOptions = [
    { key: 'AVTR', value: 'AVAL DE TRAITE' },
    { key: 'AVTD', value: 'AVAL TRAITE EN DEVISE' },
    { key: 'DELT', value: 'CREDIT MLT' },
    { key: 'CCT', value: 'CREDIT CT' },
    { key: 'ESC', value: 'ESCOMPTE' },
    { key: 'LC', value: 'LETTRE DE CREDIT' },
    { key: 'LG', value: 'LETTRE DE GARANTIE' },
    { key: 'PLCT', value: 'PLACEMENT DAP' },
    { key: 'BAB', value: 'VIREMENT BAB' },
  ];

  compteOptions = [
    { key: 'B.D.M', value: 'B.D.M' },
    { key: 'CORISBK', value: 'CORISBK' },
    { key: 'CORIS SKO', value: 'CORIS SKO' },
    { key: 'ATLAN KAYE', value: 'ATLAN KAYE' },
    { key: 'BCI', value: 'BCI' },
    { key: 'BAM1', value: 'BAM1' },
    { key: 'BOA', value: 'BOA' },
    { key: 'ECOBANK', value: 'ECOBANK' },
    { key: 'BMS', value: 'BMS' },
    { key: 'BIM', value: 'BIM' },
    { key: 'CORPR', value: 'CORPR' },
    { key: 'BDMTR', value: 'BDMTR' },
  ];

  fluxOperationOptions = [
    { key: 'RAGC', value: 'AGIOS CREDITEURS' },
    { key: 'RAPC', value: 'ANNULATION PREAVIS ...' },
    { key: 'RCHO', value: 'CHEQUE COFFRE' },
    { key: 'RCHI', value: 'REGLEMENT CHEQUE I...' },
    { key: 'RDEP', value: 'EXTOURNE DEPOSIT' },
    { key: 'RDIV', value: 'RECETTES DIVERSES' },
    { key: 'RESP', value: 'VERSEMENT ESPECE' },
    { key: 'RFC',  value: 'FACTURE CLIENT NON ...' },
    { key: 'RVIE', value: 'VIREMENT RECU ETRAN...' },
    { key: 'RVIR', value: 'VIREMENT LOCAL RECU' },
    { key: 'DAGD', value: 'AGIOS DEBITEURS' },
    { key: 'DAPR', value: 'APPROVISIONNEMENT ...' },
    { key: 'RCHO_C', value: 'CHEQUE EMIS' },
    { key: 'RETR', value: 'RETRAIT ESPECE' },
    { key: 'TRAV', value: 'TRAITE AVALISE' },
    { key: 'REGF', value: 'Réglement espèce forcé' },
    { key: 'VESP', value: 'VERSEMENT ESPECE' },
    { key: 'ENCS1', value: 'ENCAISSEMENTS SANS SUPPORT' },
    { key: 'ENCS2', value: 'ENCAISSEMENTS SANS SUPPORT' },
    { key: 'ENCS3', value: 'ENCAISSEMENTS SANS SUPPORT' },
  ];

  get currentOperationOptions() {
    return this.dialogMode === 'Flux' ? this.fluxOperationOptions : this.operationOptions;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  navigate(route: string) { this.router.navigate([route]); }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openDialog(): void {
    this.dialogMode = 'Transaction';
    this.selectedOperation = '';
    this.selectedCompte = '';
    this.details = [{ type: '', libre: '', formule: '', champ: '', nbCara: '', formatDate: '' }];
    this.tbType = ''; this.tbLibre = ''; this.tbAlign = ''; this.tbChamp = '';
    this.activePopup = null;
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.activePopup = null;
  }

  togglePopup(name: string, event: MouseEvent): void {
    event.stopPropagation();
    this.activePopup = this.activePopup === name ? null : name;
  }

  toggleDetailPopup(field: string, index: number, event: MouseEvent): void {
    event.stopPropagation();
    const key = `detail_${field}_${index}`;
    this.activePopup = this.activePopup === key ? null : key;
    this.activeDetailIndex = index;
    this.activeDetailField = field;
  }

  selectOperation(key: string): void { this.selectedOperation = key; this.activePopup = null; }
  selectCompte(key: string): void { this.selectedCompte = key; this.activePopup = null; }
  selectTbType(key: string): void { this.tbType = key; this.activePopup = null; }
  selectTbAlign(key: string): void { this.tbAlign = key; this.activePopup = null; }
  selectTbChamp(key: string): void { this.tbChamp = key; this.activePopup = null; }

  selectDetailField(key: string): void {
    if (this.activeDetailIndex !== null && this.activeDetailField !== null) {
      (this.details[this.activeDetailIndex] as any)[this.activeDetailField] = key;
    }
    this.activePopup = null;
  }

  addDetailRow(): void {
    this.details.push({ type: '', libre: '', formule: '', champ: '', nbCara: '', formatDate: '' });
  }

  removeDetailRow(i: number): void { if (this.details.length > 1) this.details.splice(i, 1); }
  deleteMainRow(i: number): void { if (this.rows.length > 1) this.rows.splice(i, 1); }

  valider(): void {
    const opLabel = this.currentOperationOptions.find(
      o => o.key === this.selectedOperation
    )?.value ?? this.selectedOperation;
    this.rows.push({ flux: opLabel, compteBancaire: this.selectedCompte });
    this.closeDialog();
  }

  closePopup(): void { this.activePopup = null; }

  getLabel(options: { key: string; value: string }[], key: string): string {
    return options.find(o => o.key === key)?.value ?? key;
  }
}