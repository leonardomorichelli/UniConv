import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, startWith, takeUntil, publishReplay, refCount, delay, distinctUntilChanged, filter } from 'rxjs/operators';
import { MessageService, ServiceQuery, ServiceEntity } from '../shared';
import { Field, FormlyFieldConfig } from '@ngx-formly/core';
import { AppConstants } from '../app-constants';
import { Convenzione, FileAttachment, convenzioneFrom } from './convenzione';
import { saveAs } from 'file-saver';
import { Cacheable, CacheBuster } from 'ngx-cacheable';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { truncate } from 'fs';
import { cacheBusterNotifier } from '../shared/base-service/base.service'
import { AuthService } from '../core';
import { BolloRepertoriazioneComponent } from './pages/bollorepertoriazione.component';
import { GlobalConstants } from './global-constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ApplicationService implements ServiceQuery, ServiceEntity {


  _baseURL: string;

  constructor(protected http: HttpClient, protected authService: AuthService, public messageService: MessageService, public confirmationDialogService: ConfirmationDialogService) {
    this._baseURL = AppConstants.baseApiURL;
  }

  getInformazioniDescrittiveFields(comp: Convenzione, aziende_min = 1): any[] {
    return [
      {
        wrappers: ['riquadro'],
        templateOptions: {
          title: 'Dati compilatore'
        },
        fieldGroup: [
          {
            key: 'id',
            type: 'input',
            hideExpression: true,
            templateOptions: {
              label: 'Id',
              disabled: true
            },
          },
          {
            key: 'user',
            type: 'externalobject',
            templateOptions: {
              label: 'Utente',
              type: 'string',
              entityName: 'user',
              entityLabel: 'Utenti',
              entityPath: 'home/users',
              codeProp: 'id',
              descriptionProp: 'name',
              isLoading: false,
            },
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
                {
                  key: 'unitaorganizzativa_uo',
                  type: 'select',
                  className: "col-md-6",
                  templateOptions: {
                    label: 'Unità organizzativa',
                    required: true,
                  },
                  hideExpression: (model, formState) => {
                    if (formState.model) {
                      return formState.model.convenzione_from && formState.model.convenzione_from == convenzioneFrom.dip;
                    } else if (model) {
                      return model.convenzione_from && model.convenzione_from == convenzioneFrom.dip
                    } else {
                      return false;
                    }
                  },
                  hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                      field.form.get('user').valueChanges.pipe(
                        startWith(field.model.user),
                        tap<any>(user => {
                          //console.log('onInit user', user);
                          //se è nuovo posso impostare l'uo di default
                          //field.formControl.setValue('');
                          if (user && user.id) {
                            field.templateOptions.options = this.getPersonaleafferenzeorganizzative(user.id).pipe(
                              tap(items => {
                                if (items.length == 1){
                                  field.formControl.setValue(items[0].value);
                                }
                              }),
                            );
                          }
                        })).subscribe();
                    }
                  }
                },

              ]
          }
        ]

      },
      //intestazione
      {
        wrappers: ['riquadro'],
        templateOptions: {
          title: 'Intestazione'
        },
        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'descrizione_titolo',
                type: 'input',
                className: "col-12",
                templateOptions: {
                  label: 'Descrizione Titolo',
                  required: true,
                  maxLength: 500,
                }
              }]
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'dipartimemto_cd_dip',
                type: 'selectinfra',
                className: "col-md-6",
                templateOptions: {
                  options: [],
                  valueProp: 'cd_dip',
                  labelProp: 'nome_breve',
                  label: 'Dipartimento',
                  required: true,
                  inizialization: () => {
                    return comp.dipartimento
                  },
                  populateAsync: () => {
                    return this.getDipartimenti();
                  },
                },
                hideExpression: (model, formState) => {
                  if (formState.model) {
                    return formState.model.convenzione_from && formState.model.convenzione_from == convenzioneFrom.amm
                  } else if (model) {
                    return model.convenzione_from && model.convenzione_from == convenzioneFrom.amm
                  } else {
                    return false;
                  }
                }
              },
              {
                key: 'resp_scientifico',
                type: 'input',
                className: "col-md-6",
                templateOptions: {
                  label: 'Responsabile scientifico',
                  required: true,
                  maxLength: 40,
                },
                expressionProperties: {
                  'templateOptions.required': (model: any, formState: any) => {
                    return model.convenzione_from !== convenzioneFrom.amm;
                  }
                },
              },
            ]
          },

          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'ambito',
                type: 'select',
                className: "col-md-6",
                defaultValue: 'istituzionale',
                templateOptions: {
                  options: [
                    { label: 'Istituzionale', value: 'istituzionale' },
                    { label: 'Commerciale', value: 'commerciale' },
                  ],
                  label: 'Ambito',
                  required: true,
                },
              },
              {
                key: 'durata',
                type: 'number',
                className: "col-md-6",
                templateOptions: {
                  label: 'Durata in mesi',
                  required: true,
                },
              },
            ]
          },
          //convenzione_type
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'convenzione_type',
                type: 'select',
                className: "col-md-4",
                defaultValue: 'TO',
                templateOptions: {
                  options: [
                    { label: 'Titolo oneroso', value: 'TO' },
                    { label: 'Titolo gratuito', value: 'TG' },
                  ],
                  change: (field: FormlyFieldConfig) => {
                    if (field.formControl.value == 'TG') {
                      field.form.get('tipopagamenti_codice').setValue(null);
                      field.form.get('corrispettivo').setValue(null);
                    }
                  },
                  label: 'Tipo convenzione',
                  required: true,
                },
              },
              {
                key: 'tipopagamenti_codice',
                type: 'select',
                className: "col-md-4",
                templateOptions: {
                  options: this.getPagamenti(),
                  valueProp: 'codice',
                  labelProp: 'descrizione',
                  label: 'Modalità di pagamento',
                  required: true,
                  inizialization: () => {
                    return comp.tipopagamento
                  },
                  populateAsync: () => {
                    return this.getPagamenti()
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'model.convenzione_type == "TG"',
                  'templateOptions.required': 'model.convenzione_type !== "TG"'
                },
              },
              {
                key: 'corrispettivo',
                type: 'maskcurrency',
                className: "col-md-4",
                templateOptions: {
                  label: 'Corrispettivo IVA esclusa se applicabile',
                  required: true,
                  min: 0,
                },
                expressionProperties: {
                  'templateOptions.disabled': 'model.convenzione_type == "TG"',
                  'templateOptions.required': 'model.convenzione_type !== "TG"'
                },
              },
            ]
          },
          //rinnovo_type
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'rinnovo_type',
                type: 'select',
                className: "col-md-6",
                defaultValue: 'non_rinnovabile',
                templateOptions: {
                  options: [
                    { label: 'Non rinnovabile', value: 'non_rinnovabile' },
                    { label: 'Rinnovo esplicito', value: 'esplicito' },
                    { label: 'Rinnovo tacito', value: 'tacito' },
                  ],
                  label: 'Tipo rinnovo',
                  required: true,
                },
              },
              {
                key: 'data_stipula',
                type: 'datepicker',
                className: "col-md-6",
                templateOptions: {
                  label: 'Data di stipula convenzione',
                },
                hideExpression: (model: any, formState: any) => {
                  return !model.id;
                }
              },
            ]
          },
          //data inizio e fine convenzione
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'data_inizio_conv',
                type: 'datepicker',
                className: "col-md-6",
                templateOptions: {
                  label: 'Data inizio convenzione',
                },
                hideExpression: (model: any, formState: any) => {
                  return !model.id;
                }
              },
              {
                key: 'data_fine_conv',
                type: 'datepicker',
                className: "col-md-6",
                templateOptions: {
                  label: 'Data fine convenzione',
                },
                hideExpression: (model: any, formState: any) => {
                  return !model.id;
                }
              }
            ]
          },
        ]
      },
      //bolli
      {
        wrappers: ['riquadro'],
        templateOptions: {
          title: 'Bollo virtuale'
        },
        fieldGroup: [
          //bollo contratto atti e provv.
          {
            key: 'bollo_atti',
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'num_righe',
                type: 'numfix',
                className: 'col-md-4',
                templateOptions: {
                  translate: true,
                  min: 1,
                  required: true,
                  label: 'num_righe_bolli_atti',
                },
              },
              {
                key: 'tipobolli_codice',
                type: 'select',
                className: "col-md-4",
                defaultValue: 'BOLLO_ATTI',
                templateOptions: {
                  translate: true,
                  options: GlobalConstants.tariffa_bolli['BOLLO_ATTI'],
                  label: 'tariffa_bolli_atti',
                  required: true,
                },
              },
              {
                key: 'num_bolli',
                type: 'numfix',
                className: 'col-md-4',
                templateOptions: {
                  translate: true,
                  min: 1,
                  required: true,
                  label: 'num_bolli_atti',
                },
              },
            ],
          },
          //bollo allegato
          {
            key: 'bollo_allegati',
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'num_righe',
                type: 'numfix',
                className: 'col-md-4',
                templateOptions: {
                  required: false,
                  translate: true,
                  min: 1,
                  label: 'num_righe_bolli_allegati',
                },
                expressionProperties: {
                  'templateOptions.required': (model: any, formState: any, field: FormlyFieldConfig) => {
                    return model!=null && model.num_bolli != null && model.num_bolli > 0;
                  },
                },
              },
              {
                key: 'tipobolli_codice',
                type: 'select',
                className: "col-md-4",
                defaultValue: 'BOLLO_ALLEGATI',
                templateOptions: {
                  translate: true,
                  options: GlobalConstants.tariffa_bolli['BOLLO_ALLEGATI'],
                  label: 'tariffa_bolli_allegati',
                },
              },
              {
                key: 'num_bolli',
                type: 'numfix',
                className: 'col-md-4',
                templateOptions: {
                  required: false,
                  translate: true,
                  min: 1,
                  label: 'num_bolli_allegati',
                },
                expressionProperties: {
                  'templateOptions.required': (model: any, formState: any, field: FormlyFieldConfig) => {
                     return model!=null && model.num_righe != null && model.num_righe > 0;
                  }
                },
              },
            ],
          },
        ],
        hideExpression: (model, formstate) => {
          return (!model.id) || (model.id && model.bollo_virtuale == false);
        },
      },

      //Aziende o enti
      {
        wrappers: ['riquadro'],
        templateOptions: {
          title: 'Aziende o enti'
        },
        fieldGroup: [
          {
            key: 'aziende',
            type: 'repeat',
            validation: {
              show: true
            },
            templateOptions: {
              min: aziende_min,
            },
            validators: {
              atleastone: {
                expression: (c) => {
                  if (c.value) {
                    if (c.value.length < 1) {
                      return false;
                    }
                  } else {
                    return false;
                  }
                  return true;
                },
                message: (error, field: FormlyFieldConfig) => `Inserire almeno un azienda o ente`,
              }
            },
            fieldArray: {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  //key: 'azienda',
                  type: 'externalobjectasync',
                  className: "col-md-12",
                  defaultValue: { id: null, denominazione: '' },
                  templateOptions: {
                    label: 'Azienda o ente',
                    type: 'numfix',
                    entityName: 'aziendaLoc',
                    entityLabel: 'Aziende o enti registrati a sistema',
                    entityPath: 'home/aziendeloc',
                    codeProp: 'id',
                    enableNew: true,
                    required: true,
                    descriptionProp: 'denominazione',
                  },
                },
              ],
            },
          },
        ],
      },
      //Fascicolo
      {
        wrappers: ['riquadro'],
        templateOptions: {
          title: 'Fascicolo'
        },
        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'titolario_classificazione',
                type: 'select',
                className: "col-md-4",
                templateOptions: {
                  options: this.getClassificazioni(),
                  labelProp: 'descrizione',
                  valueProp: 'codice',
                  label: 'Classificazione',
                  required: true,
                },
                expressionProperties: {
                  'templateOptions.disabled': (model: any, formState: any) => {
                    return model.id;
                  },
                },
              },
              {
                key: 'oggetto_fascicolo',
                type: 'string',
                className: "col-md-8",
                templateOptions: {
                  label: 'Oggetto del fascicolo',
                  required: true,
                  maxLength: 500
                },
                expressionProperties: {
                  'templateOptions.disabled': (model: any, formState: any) => {
                    return model.id;
                  },
                },
              },
            ],

          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'numero',
                type: 'string',
                className: "col-md-6",
                templateOptions: {
                  label: 'Fascicolo',
                  disabled: true,
                },
                hideExpression: (model: any, formState: any) => {
                  return !model.id;
                }
              }
            ]
          }
        ]
      }
    ];
  }

  getById(id: any): Observable<any> {
    return this.getConvenzioneById(id);
  }

  getMetadata(): FormlyFieldConfig[] {
    return [
      {
        key: 'id',
        type: 'input',
        hideExpression: true,
        templateOptions: {
          label: 'Id',
          disabled: true
        },
      },
      {
        key: 'user_id',
        type: 'external',
        wrappers: [],
        templateOptions: {
          label: 'Codice utente',
          type: 'string',
          entityName: 'user',
          entityLabel: 'Utenti',
          codeProp: 'id',
          descriptionProp: 'name',
        },
        modelOptions: {
          updateOn: 'blur',
        },
      },


      {
        key: 'descrizione_titolo',
        type: 'input',
        className: "col-12",
        templateOptions: {
          label: 'Descrizione Titolo',
          required: true,
        },
      },
      {
        key: 'dipartimemto_cd_dip',
        type: 'select',
        className: "col-md-6",
        templateOptions: {
          options: this.getDipartimenti(),
          valueProp: 'cd_dip',
          labelProp: 'nome_breve',
          label: 'Dipartimento',
          required: true
        },
      },
      {
        key: 'resp_scientifico',
        type: 'input',
        className: "col-md-6",
        templateOptions: {
          label: 'Responsabile scientifico',
          required: true,
        },
      },
      {
        key: 'aziende.id',
        type: 'external',
        className: "col-md-6",
        templateOptions: {
          label: 'Azienda',
          type: 'string',
          entityName: 'aziendaLoc',
          entityLabel: 'Aziende',
          codeProp: 'id',
          descriptionProp: 'denominazione',
        },
      },
      {
        key: 'convenzione_type',
        type: 'select',
        className: "col-md-4",
        defaultValue: 'TO',
        templateOptions: {
          options: [
            { label: 'Titolo oneroso', value: 'TO' },
            { label: 'Titolo gratuito', value: 'TG' },
          ],
          label: 'Tipo convenzione',
          required: true,
        },
      },
      {
        key: 'ambito',
        type: 'select',
        className: "col-md-4",
        templateOptions: {
          options: [
            { label: 'Istituzionale', value: 'istituzionale' },
            { label: 'Commerciale', value: 'commerciale' },
          ],
          label: 'Ambito',
          required: true,
        },
      },
      {
        key: 'tipopagamenti_codice',
        type: 'select',
        className: "col-md-4",
        templateOptions: {
          options: this.getPagamenti(),
          valueProp: 'codice',
          labelProp: 'descrizione',
          label: 'Modalità di pagamento',
          required: true
        }
      },
      {
        key: 'corrispettivo',
        type: 'input',
        className: "col-md-6",
        templateOptions: {
          label: 'Corrispettivo IVA esclusa se applicabile',
          required: true,
        },
      },
      {
        key: 'data_inizio_conv',
        type: 'date',
        className: "col-md-6",
        templateOptions: {
          label: 'Data inizio',
          required: true,
        },
      },
      {
        key: 'data_fine_conv',
        type: 'date',
        className: "col-md-6",
        templateOptions: {
          label: 'Data fine',
          required: true,
        },
      },
      {
        key: 'current_place',
        type: 'select',
        className: "col-md-6",
        templateOptions: {
          options: [
            { value: 'proposta', label: 'Proposta' },
            { value: 'approvato', label: 'Approvata' },
            { value: 'inapprovazione', label: 'In approvazione' },
            { value: 'da_firmare_direttore', label: 'Stipula controparte' }, //Da controfirmare UniCam
            { value: 'da_firmare_controparte2', label: 'Stipula UniCam' },  //Da controfirmare controparte
            { value: 'firmato', label: 'Firmata' },
            { value: 'repertoriato', label: 'Repertoriata' },
          ],
          label: 'Stato',
          required: true,
        },
      }
    ];
  }

  clearMessage() {
    this.messageService.clear();
  }

  query(model): Observable<any> {
    return this.http
      .post<any>(this._baseURL + '/convenzioni/query', model, httpOptions).pipe(
        tap(sub => this.messageService.info('Ricerca effettuata con successo')),
        catchError(this.handleError('query'))
      );
  }

  export(model): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http
      .post(this._baseURL + '/convenzioni/export', model, { headers, responseType: 'text' }).pipe(
        tap(sub => this.messageService.info('Export effettuato con successo')),
        catchError(this.handleError('export'))
      );
  }

  exportxls(model): Observable<any> {
    return this.http
      .post(this._baseURL + `/convenzioni/exportxls`, model, { responseType: 'blob' }).pipe(
        tap(sub => this.messageService.info('Export effettuato con successo')),
        catchError(this.handleError('export'))
      );
  }


  getConvenzioneById(id: number): Observable<any> {
    return this.http
      .get<Convenzione>(this._baseURL + '/convenzioni/' + id.toString()).pipe(
        tap(sub => {
          if (sub)
            this.messageService.info('Lettura effettuata con successo')
          else
            this.messageService.info('Domanda non trovata')
        }),
        catchError(this.handleError('getConvenzioneById'))
      );
  }

  getConvenzioni(): Observable<any> {
    return this.http
      .get(this._baseURL + '/convenzioni', httpOptions);
  }

  getConvenzioneByUserId(userId: number): Observable<Convenzione> {

    if (userId > 0) {
      let res = this.http
        .get<Convenzione>(this._baseURL + '/convenzioni', {
          params: new HttpParams().set('userId', userId.toString())
        }).pipe(
          tap(sub => this.messageService.info('Lettura domanda effetuata con successo')),
          catchError(this.handleError('getConvenzioneByUserId', null))
        );

      return res;
    }
  }

  createSchemaTipo(convenzione: Convenzione, retrow: boolean = false): any {
    const url = `${this._baseURL + '/convenzioni/createschematipo'}`;
    let res = this.http.post<Convenzione>(url, convenzione, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Creazione effettuata con successo')
        ),
        catchError(this.handleError('createSchemaTipo', convenzione, retrow))
      );
    return res;
  }

  store(convenzione: any, retrow: boolean): Observable<any> {
    convenzione.stato_avanzamento = 'incomp';
    const url = `${this._baseURL + '/convenzioni'}`;
    let res = this.http.post<Convenzione>(url, convenzione, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Creazione effettuata con successo')
        ),
        catchError(this.handleError('updateConvenzione', convenzione, retrow))
      );
    return res;
  }

  remove(id: any): Observable<any> {
    throw new Error("Method not implemented.");
  }

  update(convenzione: Convenzione, id: number, retrow: boolean = false): any {
    if (id) {
      const url = `${this._baseURL + '/convenzioni'}/${id}`;
      let res = this.http.put<Convenzione>(url, convenzione, httpOptions)
        .pipe(
          tap(sub => {
            this.messageService.info('Aggiornamento effettuato con successo');
            return sub;
          }),
          catchError(this.handleError('updateConvenzione', convenzione, retrow))
        );
      return res;
    } else {
      return this.store(convenzione, retrow);
    }
  }

  annullaConvenzione(data: any, retrow: boolean = false): any {
    const url = `${this._baseURL + '/convenzioni/annullaconvenzione'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub => {
          this.messageService.info('Annullamento effettuato con successo');
          return sub;
        }),
        catchError(this.handleError('annullaConvenzione'))
      );
    return res;

  }

  uploadFile(file: FileAttachment): Observable<FileAttachment> {
    const url = `${this._baseURL + '/convenzioni/uploadFile'}`;
    let res = this.http.post<FileAttachment>(url, file, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Creazione effettuata con successo')
        ),
        catchError(this.handleError('caricamento documento', null))
      );
    return res;
  }

  deleteFile(id: number): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/uploadFile/'}${id}`;
    let res = this.http.delete<any>(url, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Eliminazione documento effettuata con successo')
        ),
        catchError(this.handleError('deleteFile', null, true))
      );
    return res;
  }

  validationStep(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/validationstep'}`;
    let res = this.http.post<FileAttachment>(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Validazione effettuata con successo')
        ),
        catchError(this.handleError('validationStep', null, retrow))
      );
    return res;
  }


  sottoscrizioneStep(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/sottoscrizionestep'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Sottoscrizione effettuata con successo')
        ),
        catchError(this.handleError('sottoscrizioneStep', null, retrow))
      );
    return res;
  }

  complSottoscrizioneStep(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/complsottoscrizionestep'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Completamento sottoscrizione effettuata con successo')
        ),
        catchError(this.handleError('complSottoscrizioneStep', null, retrow))
      );
    return res;
  }

  bolloRepertoriazioneStep(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/bollorepertoriazionestep'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Repertoriazione sottoscrizione effettuata con successo')
        ),
        catchError(this.handleError('bolloRepertoriazioneStep', null, retrow))
      );
    return res;
  }

  cancellazioneSottoscrizione(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/cancellazionesottoscrizione'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Cancellazione sottoscrizione effettuata con successo')
        ),
        catchError(this.handleError('cancellazionesottoscrizione', null, retrow))
      );
    return res;
  }

  registrazioneSottoscrizione(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/registrazionesottoscrizione'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Registrazione sottoscrizione effettuata con successo')
        ),
        catchError(this.handleError('registrazioneSottoscrizione', null, retrow))
      );
    return res;
  }

  registrazioneComplSottoscrizione(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/registrazionecomplsottoscrizione'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Registrazione completamento sottoscrizione effettuata con successo')
        ),
        catchError(this.handleError('registrazioneComplSottoscrizione', null, retrow))
      );
    return res;
  }




  registrazioneBolloRepertoriazione(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/registrazionebollorepertoriazione'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Registrazione convenzione repertoriata effettuata con successo')
        ),
        catchError(this.handleError('registrazioneBolloRepertoriazione', null, retrow))
      );
    return res;
  }

  @CacheBuster({
    cacheBusterNotifier: cacheBusterNotifier
  })
  richiestaEmissioneStep(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/richiestaemissionestep'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Richiesta emissione effettuata con successo')
        ),
        catchError(this.handleError('richiestaEmissioneStep', null, retrow))
      );
    return res;
  }

  @CacheBuster({
    cacheBusterNotifier: cacheBusterNotifier
  })
  invioRichiestaPagamentoStep(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/inviorichiestapagamentostep'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Richiesta di pagamento effettuata con successo')
        ),
        catchError(this.handleError('invioRichiestaPagamentoStep', null, retrow))
      );
    return res;
  }

  @CacheBuster({
    cacheBusterNotifier: cacheBusterNotifier
  })
  emissioneStep(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/emissionestep'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Emissione effettuata con successo')
        ),
        catchError(this.handleError('emissioneStep', null, retrow))
      );
    return res;
  }

  @CacheBuster({
    cacheBusterNotifier: cacheBusterNotifier
  })
  modificaEmissioneStep(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/modificaemissionestep'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Modifica emissione effettuata con successo')
        ),
        catchError(this.handleError('modificaEmissioneStep', null, retrow))
      );
    return res;
  }

  @CacheBuster({
    cacheBusterNotifier: cacheBusterNotifier
  })
  pagamentoStep(data: any, retrow: boolean = false): Observable<any> {
    const url = `${this._baseURL + '/convenzioni/pagamentostep'}`;
    let res = this.http.post(url, data, httpOptions)
      .pipe(
        tap(sub =>
          this.messageService.info('Registrazione effettuata con successo')
        ),
        catchError(this.handleError('pagamentostep', null, retrow))
      );
    return res;
  }

  //@Cacheable()
  getNextActions(id): Observable<any> {
    const url = `${this._baseURL}/convenzioni/${id}/actions`
    return this.http.get(url, httpOptions);
  }

  @Cacheable()
  getTitulusDocumentURL(id): Observable<any> {
    return this.http.get(this._baseURL + '/convenzioni/gettitulusdocumenturl/' + id.toString(), httpOptions).pipe(
      catchError(this.handleError('getTitulusDocumentURL', null, true))
    )
  }

  @Cacheable()
  getDipartimenti(): Observable<any> {
    return this.http.get<any>(this._baseURL + '/dipartimenti/user/' + this.authService.userid, httpOptions).pipe(
      map(x => {
        return x == null ? [] : x.map(el => { return { cd_dip: parseInt(el.cd_dip), nome_breve: el.nome_breve } })
      }
      )
    );
  }

  @Cacheable()
  getPersonaleafferenzeorganizzative(id): Observable<any> {
    return this.http.get<any>(this._baseURL + '/users/personaleafferenzeorganizzative/' + id, httpOptions).pipe(
      map(x => {
        return x == null ? [] : x.map(el => { return { value: el.cd_csa, label: el.nome_uo } })
      }
      )
    );
  }


  @Cacheable()
  getDirettoreDipartimento(codiceDip): Observable<any> {
    return this.http.get(this._baseURL + '/dipartimenti/direttore/' + codiceDip.toString(), httpOptions);
  }

  @Cacheable()
  getPagamenti(): Observable<any> {
    return this.http.get(this._baseURL + '/convenzioni/pagamenti', httpOptions);
  }

  @Cacheable()
  getAttachemntTypes(): Observable<any> {
    return this.http.get(this._baseURL + '/convenzioni/attachmenttypes/', httpOptions);
  }

  @Cacheable()
  getClassificazioni(): Observable<any> {
    return this.http.get(this._baseURL + '/convenzioni/classificazioni', httpOptions);
  }

  @Cacheable()
  getValidationOffices(): Observable<any> {
    return this.http.get(this._baseURL + '/convenzioni/uffici/' + 'validazione', httpOptions);
  }

  @Cacheable()
  getUfficiFiscali(): Observable<any> {
    return this.http.get(this._baseURL + '/convenzioni/uffici/' + 'inemissione', httpOptions);
  }

  @Cacheable()
  getPersonaleUfficio(id): Observable<any> {
    if (id) {
      return this.http.get(this._baseURL + '/convenzioni/personaleufficio/' + id.toString(), httpOptions);
    }
    return of([]);
  }

  static isResponsabileUfficio(posizorg: string): boolean {
    return (
          //UniUrb
          (posizorg == 'RESP_UFF') ||
          (posizorg == 'COOR_PRO_D') ||
          (posizorg == 'VIC_RES_PL') ||
          (posizorg == 'RESP_PLESS') ||
          (posizorg == 'DIRIGENTE') ||
          //UniCam
          (posizorg == 'RESP_PO') ||
          (posizorg == 'MANAG01') ||
          (posizorg == 'BIBL02')
        );
  }


  @Cacheable()
  getAziende(id): Observable<any> {
    if (id) {
      return this.http.get(this._baseURL + '/convenzioni/' + id.toString() + '/aziende/', httpOptions);
    }
    return of([]);
  }

  @Cacheable()
  getMinimal(id): Observable<any> {
    if (id) {
      return this.http.get(this._baseURL + '/convenzioni/getminimal/' + id.toString(), httpOptions);
    }
    return of([]);
  }


  download(id): Observable<any> {
    if (id) {
      return this.http.get(this._baseURL + '/attachments/download/' + id.toString(), httpOptions).pipe(catchError(this.handleError('download', null, false)));
    }
    return of([]);
  }


  generatePDF(id: number) {
    this.http.get(this._baseURL + '/convenzioni/generapdf/' + id.toString(), { responseType: 'blob' }).subscribe(
      (response) => {
        var blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, 'convenzionePreview.pdf');
      },
      e => { console.log(e); }
    );
  }

  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
  protected handleError<T>(operation = 'operation', result?: T, retrow: boolean = false) {
    return (error: any): Observable<T> => {


      console.error(error);

      this.messageService.error(`L'operazione di ${operation} è terminata con errori: ${error.message}`, true, false, error);

      if (!retrow)
        return of(result as T);
      else
        return throwError(error);
    };
  }

  data: any;
  getRichiestaEmissioneData() {
    return this.data;
  }
  setRichiestaEmissioneData(data: any) {
    this.data = data;
  }



}
