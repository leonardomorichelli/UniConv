import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup, FormControl, ValidationErrors, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Convenzione, FileAttachment, ConvenzioneAmministrativa, convenzioneFrom, rinnovoType } from '../convenzione';
import { ApplicationService } from '../application.service';
import { AuthService } from 'src/app/core';
import { encode, decode } from 'base64-arraybuffer';
import { Subject } from 'rxjs';import { PDFJSStatic } from 'pdfjs-dist';
import ControlUtils from 'src/app/shared/dynamic-form/control-utils';
import { InfraMessageType } from 'src/app/shared/message/message';

const PDFJS: PDFJSStatic = require('pdfjs-dist');

@Component({
  selector: 'app-ins-conv-amm',
  templateUrl: './ins-conv-amm.component.html',
  styles: []
})
export class InsConvAmmComponent implements OnInit {
  public static DOC_APP = 'DA';
  public static CONV_BOZZA = 'CB';

  private prefix = 'insconvamm';

  onDestroy$ = new Subject<void>();
  fields: FormlyFieldConfig[];

  form = new FormGroup({});
  model: ConvenzioneAmministrativa;

  isLoading: boolean;

  options: FormlyFormOptions;

  mapAttachment: Map<string, FileAttachment> = new Map<string, FileAttachment>();

  constructor(private service: ApplicationService, public authService: AuthService, private router: Router,  private cdRef : ChangeDetectorRef) {

    PDFJS.disableWorker = true;

    this.model = {
      schematipotipo: 'schematipo',
      transition: 'self_transition',
      user_id: authService.userid,
      id: null,
      descrizione_titolo: '',
      dipartimemto_cd_dip: null,
      nominativo_docente: '',
      emittente: '',
      user: { id: authService.userid, name: authService.username },
      dipartimento: { cd_dip: null, nome_breve: '' },
      //area: { id_ab: null, nome_breve: '' },
      stato_avanzamento: null,
      convenzione_type: 'TO',
      tipopagamento: { codice: null, descrizione: '' },
      azienda: { id: null, denominazione: '' },
      unitaorganizzativa_uo: '',
      unitaorganizzativa_affidatario: '',
      attachments: [],
      aziende:[],
      convenzione_from: convenzioneFrom.amm,
      rinnovo_type: rinnovoType.non_rinnovabile
    };

    if (this.getStorageModel()){
      let app = JSON.parse(this.getStorageModel());
      this.checkHistory(app);
      app.file_CD = "";
      this.model = app;
      this.setStorageModel();
    } else {
      if (this.checkHistory(this.model))
        this.setStorageModel();
    }

    this.options = {
      formState: {
        isLoading: false,
        model: this.model,
      },
    };

    this.fields = [
      {
        type: 'tabinfra',
        templateOptions:{
          onSubmit: () => this.onSubmit(),
        },
        fieldGroup: [
          {
            wrappers: ['accordioninfo'],
            fieldGroup: [
            ].concat(
              this.service.getInformazioniDescrittiveFields(this.model).map(x => {
                if (x.key == 'user') {
                  setTimeout(()=> {
                    x.templateOptions.disabled = true;
                  }, 0);
                }
                return x;
              })),
            templateOptions: {
              label: 'Informazioni descrittive'
            },
          },
          {
            wrappers: ['accordioninfo'],
            fieldGroup: [
              {
                key: 'file_DA',
                type: 'fileinput',
                validation: {
                  show: true,
                },
                templateOptions: {
                  label: 'Bozza convenzione (formato word)',
                  description: 'Versione editabile (file word) della bozza di convenzione. Dimensione massima 2MB.',
                  type: 'input',
                  placeholder: 'Scegli il documento',
                  accept: '.doc,.docx ,application/msword',
                  required: true,
                  // tooltip: {
                  //   content: 'Versione editabile (file word) della bozza di convenzione'
                  // },
                  onSelected: (selFile, field) => {
                  this.onSelectCurrentFile(selFile, InsConvAmmComponent.DOC_APP, field)
                  }
                },
                validators: {
                  formatpdf: {
                  expression: (c) => {
                   return c.value ? /.+\.([dD][oO][cC][xX]?)/.test(c.value) : true;
                  },
                  message: (error, field: FormlyFieldConfig) =>  `Formato non consentito`,
                  },
                  maxsize: {
                  expression: (c,f) => (this.mapAttachment.get(InsConvAmmComponent.DOC_APP) &&
                    this.mapAttachment.get(InsConvAmmComponent.DOC_APP)._filesize &&
                    this.mapAttachment.get(InsConvAmmComponent.DOC_APP)._filesize > 2097152) ? false : true,
                  message: (error, field) => `La dimensione del file eccede la dimensione massima consentita `,
                  },
                }
              }
            ],
            templateOptions: {
              label: 'Allegati'
            },
          }
        ]
      }];

      if (this.getStorageModel()){
        let app = JSON.parse(this.getStorageModel());
        this.checkHistory(app);
        this.model = app;
        this.setStorageModel();
      }else{
        if (this.checkHistory(this.model))
          this.setStorageModel();
      }
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      var tosubmit: ConvenzioneAmministrativa = { ...this.model, ...this.form.value };

      var file = this.mapAttachment.get(InsConvAmmComponent.DOC_APP);
      file.docnumber = this.model['docnumber'];
      file.emission_date = this.model['data_emissione'];

      //aggiungo tutti gli allegati
      tosubmit.attachments = [];
      tosubmit.attachments.push(...Array.from<FileAttachment>(this.mapAttachment.values()));

      this.service.createSchemaTipo(tosubmit, true).subscribe(
        result => {
          this.isLoading = false;
          sessionStorage.removeItem(this.prefix+'_model');
          this.router.navigate(['home/dashboard/dashboard1']);
        },
        error => {
          this.isLoading = false;
          console.log(error);
        }

      );
    }
  }

  onAziendaRicerca(){
    this.router.navigate(['home/aziendeloc']);
  }

  public onValidate() {
    ControlUtils.validate(this.fields[0]);
  }

  getStorageModel(){
    if (this.prefix){
      return sessionStorage.getItem(this.prefix+'_model');
    }
    return null;
  }

  setStorageModel(){
    if (this.prefix){
      sessionStorage.setItem(this.prefix+'_model',JSON.stringify(this.model));
    }
  }


  checkHistory(model){
    const entity = history.state ? history.state.entity : null;
    if (entity){
      if (model.aziende.length > 0)
      {
        model.aziende = model.aziende.filter(x=>x !== (undefined || null || '') && x.id);
      }
      this.pushToArray(model.aziende,entity);
      return true;
    }
    return false;
  }

  pushToArray(arr, obj) {
    const index = arr.findIndex((e) => e.id === obj.id);

    if (index === -1) {
        arr.push(obj);
    } else {
        arr[index] = obj;
    }
  }

  render_page(pageData) {

    let render_options = {
      //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      normalizeWhitespace: false,
      //do not attempt to combine same line TextItem's. The default value is `false`.
      disableCombineTextItems: false
    }

    return pageData.getTextContent(render_options)
      .then(function (textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
          if (lastY == item.transform[5] || !lastY) {
            text += item.str;
          }
          else {
            text += '\n' + item.str;
          }
          lastY = item.transform[5];
        }
        return text;
      });
  }

  async parsePdf(data){
    let text = '';
    await PDFJS.getDocument({ data: data }).then(async (doc) => {
      let counter: number = 1;
      counter = counter > doc.numPages ? doc.numPages : counter;

      for (var i = 1; i <= counter; i++) {
        let pageText = await doc.getPage(i).then(pageData => this.render_page(pageData));
        text = `${text}\n\n${pageText}`;
      }

      let number = text.match(/[d|D]elibera n.?\s?([A-Za-z0-9\/]*)\s*\n/);
      if (number && number[1]){
        this.form.get('docnumber').setValue(number[1]);

      }
      let data_emissione = text.match(/[r|R]iunione del giorno\s([0-9]{2}\/[0-9]{2}\/[0-9]{4})\s?/);
      if (data_emissione && data_emissione[1]){
        let converted = data_emissione[1].replace(/\//g,'-');
        this.form.get('data_emissione').setValue(converted);
      }
      this.isLoading = false;
    });
  }

  onSelectCurrentFile(currentSelFile: File, typeattachemnt: string, field: FormlyFieldConfig) {

    if (currentSelFile == null) {
      //caso di cancellazione
      this.mapAttachment.delete(typeattachemnt);
      return;
    }

    this.isLoading = true;
    let currentAttachment: FileAttachment = {
      model_type: 'convenzione',
      filename: currentSelFile.name,
      attachmenttype_codice: typeattachemnt,
      _filesize: null
    }

    currentAttachment._filesize = currentSelFile.size;
    this.mapAttachment.set(currentAttachment.attachmenttype_codice, currentAttachment);
    field.formControl.markAsDirty();
    field.formControl.updateValueAndValidity();

    const reader = new FileReader();

    reader.onload = async (e: any) => {
      this.isLoading = true;
      currentAttachment.filevalue = encode(e.target.result);

      if (currentSelFile.name.search('pdf')>0){
        try {
          await this.parsePdf(e.target.result);
          field.formControl.markAsDirty();
        } catch (error) {
          this.isLoading = false;
        }
      }

      if (!currentAttachment.filevalue) {
        this.isLoading = false;
        return;
      }

      this.mapAttachment.set(currentAttachment.attachmenttype_codice, currentAttachment);
      this.isLoading = false;
    }
    reader.readAsArrayBuffer(currentSelFile);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    if (this.form.touched){
      this.setStorageModel();
    }

  }
}
