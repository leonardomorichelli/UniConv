import { RouteInfo } from "../shared/sidebar/sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Dashboard',
    icon: 'icon-Car-Wheel',
    class: 'has-arrow',
    permissions: ['ADMIN','SUPER-ADMIN','OP_APPROVAZIONE','OP_CONTABILITA','ADMIN_AMM','OP_UFF_BILANCIO'],
    extralink: false,
    submenu: [
      {
        path: 'dashboard/dashboard1',
        title: 'Attività',
        icon: '',
        class: '',
        permissions: ['ADMIN','SUPER-ADMIN','OP_APPROVAZIONE','OP_CONTABILITA','ADMIN_AMM'],
        extralink: false,
        submenu: []
      },
      {
        path: 'dashboard/dashboard2',
        title: 'Conv. dipartimentali',
        icon: '',
        class: '',
        permissions: ['ADMIN','SUPER-ADMIN','OP_UFF_BILANCIO'],
        extralink: false,
        submenu: []
      },
      {
        path: 'dashboard/dashboardconvamministrativa',
        title: 'Conv. amministrative',
        icon: '',
        class: '',
        permissions: ['ADMIN_AMM','SUPER-ADMIN','OP_UFF_BILANCIO'],
        extralink: false,
        submenu: []
      },

    ],
  },



  {
    path: '',
    title: 'Funzionalità',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    permissions: ['ADMIN','SUPER-ADMIN','ADMIN_AMM'],
    submenu: [],
  },
  {
    path: '',
    title: 'Nuova convenzione',
    icon: 'icon-File',
    class: 'has-arrow',
    extralink: false,
    permissions: ['ADMIN','SUPER-ADMIN','ADMIN_AMM'],
    submenu: [
      {
        path: 'multistep-schematipo',
        title: 'Scuola di Ateneo', //Aree
        icon: 'icon-File',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'ins-conv-amm',
        title: 'Amministrazione Centrale', //Amministrativa
        icon: 'icon-File',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN_AMM','SUPER-ADMIN'],
      }
    ],
  },
  {
    path: 'convenzioni',
    title: 'Convenzioni',
    icon: 'icon-File-Search',
    class: '',
    extralink: false,
    submenu: [],
    permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN','VIEWER','OP_UFF_BILANCIO'],
  },
  {
    path: 'scadenze',
    title: 'Scadenze pagamenti',
    icon: 'icon-File-Search',
    class: '',
    extralink: false,
    submenu: [],
    permissions: ['ADMIN','SUPER-ADMIN','VIEWER','OP_UFF_BILANCIO'],
  },
  {
    path: 'bolli',
    title: 'Bolli',
    icon: 'icon-File-Search',
    class: '',
    extralink: false,
    submenu: [],
    permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN','OP_UFF_BILANCIO'],
  },
  // DOCUMENTAZIONE A SUPPORTO
  {
    path: '',
    title: 'Documentazione',
    icon: 'icon-Speach-Bubble',
    class: 'has-arrow',
    extralink: false,
    permissions:  ['ADMIN','SUPER-ADMIN','OP_APPROVAZIONE','OP_CONTABILITA','ADMIN_AMM','OP_UFF_BILANCIO','VIEWER'],
    submenu: [
      {
        path: 'lineeguida/manuale',
        title: 'Linee guida',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN','SUPER-ADMIN','OP_APPROVAZIONE','OP_CONTABILITA','ADMIN_AMM','OP_UFF_BILANCIO'],
      },
    ],
  },

  {
    path: '',
    title: 'Fasi',
    icon: 'icon-Wrench',
    class: 'has-arrow',
    extralink: false,
    permissions: ['SUPER-ADMIN'],
    submenu: [
      {
        path: 'validazione',
        title: 'Approvazione',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN','SUPER-ADMIN','OP_APPROVAZIONE'],
      },
      {
        path: '',
        title: 'Sottoscrizione',
        icon: '',
        class: 'has-arrow',
        extralink: false,
        permissions: ['ADMIN','SUPER-ADMIN'],
        submenu: [
          {
            path: 'sottoscrizione',
            title: 'Inizio sottoscrizione',
            icon: '',
            class: '',
            extralink: false,
            permissions: ['ADMIN','SUPER-ADMIN'],
            submenu: [],
          },
          {
            path: 'firmacontroparte',
            title: 'Completa controparte',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
            permissions: ['ADMIN','SUPER-ADMIN'],
          },
          {
            path: 'firmadirettore',
            title: 'Completa UniCam',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
            permissions: ['ADMIN','SUPER-ADMIN'],
          },
        ],
      },
      {
        path: 'bollorepertoriazione',
        title: 'Bollo repertoriazione',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'richiestaemissione',
        title: 'Richiesta emissione',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'inviorichiestapagamento',
        title: 'Richiesta pagamento',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'emissione',
        title: 'Emissione',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN','SUPER-ADMIN','OP_CONTABILITA'],
      },

    ]
  },
  //APRE GESTIONE
  {
    path: '',
    title: 'Gestione',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
    submenu: [],
  },
  {
    path: '',
    title: 'Utenti',
    icon: 'icon-Administrator',
    class: 'has-arrow',
    extralink: false,
    permissions: ['SUPER-ADMIN'],
    submenu: [
      {
        path: 'users',
        title: 'Utenti',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['SUPER-ADMIN'],
      },
      {
        path: 'roles',
        title: 'Ruoli',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['SUPER-ADMIN'],
      },
      {
        path: 'permissions',
        title: 'Permessi',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['SUPER-ADMIN'],
      },
      {
        path: 'logattivita',
        title: 'Log',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['SUPER-ADMIN'],
      },
      {
        path: 'mappingruoli',
        title: 'Associazione ruoli',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['SUPER-ADMIN'],
      },
    ]}, //chiude gestione utenti
    {
      path: '',
      title: 'Configurazioni',
      icon: 'icon-Gear',
      class: 'has-arrow',
      extralink: false,
      permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
      submenu: [
      {
        path: 'tipopagamenti',
        title: 'Tipo pagamenti',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'classificazioni',
        title: 'Classificazione',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'mappinguffici',
        title: 'Mapping uffici',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'tasks',
        title: 'Attività',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'aziendeloc',
        title: 'Aziende',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
      },
    ]}, //chiude configurazioni
    {
    path: '',
    title: 'Ricerche Titulus',
    icon: 'icon-Paint-Brush',
    class: 'has-arrow',
    extralink: false,
    permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
    submenu: [
      {
        path: 'personeinterne',
        title: 'Persone interne',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'struttureinterne',
        title: 'Strutture interne',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'struttureesterne',
        title: 'Strutture esterne',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
      },
      {
        path: 'documenti',
        title: 'Documenti',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
        permissions: ['ADMIN_AMM','ADMIN','SUPER-ADMIN'],
      },
    ]},//chiude ricerche titulus
];
