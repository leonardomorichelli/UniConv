import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Convenzione } from '../../convenzione';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

export interface IDocB {
  descrDocumento?: string;
  numero: string;
  data: string;
  id?: number;
}
interface IInfoBozza {
  richiestaname: string;
  docBozza: IDocB;
};

@Component({
  selector: 'app-convenzionedetails',
  templateUrl: './convenzionedetails.component.html',
  styles: []
})
export class ConvenzionedetailsComponent implements OnInit {

  static keyValueState: { [key: string]: number } = {
    'bozza': 0,
    'start': 0,
    'proposta': 1,
    'inapprovazione': 2,
    'approvato': 3,
    'da_firmare_direttore': 4,
    'da_firmare_controparte2': 5,
    'firmato': 6,
    'repertoriato': 7
  };

  isLoading: boolean = false;
  conv: Convenzione;
  onDestroy$ = new Subject<void>();

  docBozza: IInfoBozza;

  constructor(private service: ApplicationService, private route: ActivatedRoute, protected router: Router, protected location: Location) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      if (params['id']) {
        this.isLoading = true;
        this.service.clearMessage();
        this.service.getConvenzioneById(params['id']).subscribe((data) => {
          this.conv = data;
          this.isLoading = false;

          console.log("CONV: loaded")

          //if (this.conv.schematipotipo != 'schematipo')
          if (this.conv != null) {
            const file = this.conv.attachments.find(x => x.attachmenttype_codice == 'DA');
            if (file) {
              let docBozza = {
                descrDocumento: file.attachmenttype.descrizione,
                data: file.emission_date.toString(),
                numero: file.docnumber,
                id: file.filetype !== 'empty' ? file.id : null
              }
              this.conv.docBozza = docBozza;
            }
          }
        });
      }
    });
  }

  modelChange(event) {
    this.conv = event;
  }

  loadingChange(event) {
    this.isLoading = event;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get denominazione() {
    if (this.conv && this.conv.aziende)
      return this.conv.aziende.reduce((acc, x) => acc = acc + ' ' + x.denominazione, '');
    return '';
  }

  /**
   *
   * @param currentstate stato attuale della convenzione
   * @param value valore per cui si vuole verificare se sia stato eseguito o meno
   */
  public static executed(currentstate, value) {
    const current = ConvenzionedetailsComponent.keyValueState[currentstate];
    const comparevalue = ConvenzionedetailsComponent.keyValueState[value];
    return current - comparevalue;
  }

  onModify() {
    this.router.navigate(['home/convenzioni', this.conv.id]);
  }

  onBack() {
    this.location.back();
  }

  isDeleted() {
    return !!this.conv.deleted_at;
  }

}
