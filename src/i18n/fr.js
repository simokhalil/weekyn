import AppConfig from "AppConfig";

export default {
  hello: 'Bonjour',

  common: {
    actions: 'Actions',
    add: 'Ajouter',
    cancel: 'Annuler',
    confirm: 'Je confirme',
    createdAt: 'Créé le',
    edit: 'Modifier',
    noDataToShow: 'Aucune donnée à afficher',
    ok: 'Ok',
    save: 'Enregistrer',
    select: 'Sélectionner',
    validate: 'Valider',
    delete: 'Supprimer',
    download: 'Télécharger',
  },

  menus: {
    dashboard: 'Accueil',
    clients: 'Clients',
    timings: 'Activité',
    invoices: 'Factures',
    settings: 'Paramètres',
  },

  submenus: {
    clients: {
      active: 'Actifs',
      archived: 'Archivés',
    },
  },

  login: {
    authenticate: 'Se connecter',
    email: 'Email',
    password: 'Mot de passe',
    forgotPassword: 'Mot de passe oublié ?',
    signup: 'Pas de compte ? Inscription',
    signout: 'Se déconnecter',
  },

  signup: {
    signUp: 'Créer un compte',
    email: 'Email',
    password: 'Mot de passe',
    name: 'Nom',
    login: 'Vous avez déjà un compte ? Connexion',
  },

  dashboard: {
    description: 'Description de la section Dashboard',
  },

  clients: {
    identity: 'Identité',
    contact: 'Contact',
    name: 'Nom du client',
    email: 'Email',
    phone: 'Phone',
    address: 'Adresse',
    postalCode: 'Code postal',
    city: 'Ville',
    country: 'Pays',
    deleteConfirmationTitle: 'Voulez-vous vraiment supprimer ce client ?',
    deleteConfirmationText: 'Vous êtes sur le point de supprimer un client. Cette opération est irrévocable. Êtes-vous sûr(e) de vouloir continuer ?',
    clientSheet: 'Fiche client',
    projects: 'Projets',
    addProject: 'Ajouter un projet',
    projectName: 'Nom du projet',
    tjm: 'TJM',
  },

  activity: {
    addLine: 'Ajouter une ligne',
  },

  invoices: {
    invoices: 'Factures',
    invoice: 'Facture',
    newInvoice: 'Nouvelle facture',
    date: 'Date d\'émission',
    number: 'N°',
    clientName: 'Client',
    amountExclTax: 'Montant HT',
    amountInclTax: 'Montant TTC',
    exportPdf: 'Télécharger en PDF',
    status: 'Statut',
    statusLabel: {
      [AppConfig.invoiceStates.DRAFT]: 'Brouillon',
      [AppConfig.invoiceStates.SAVED]: 'Enregitré',
      [AppConfig.invoiceStates.SENT]: 'Enregitré, Envoyé',
    },
    newInvoiceTitle: {
      [AppConfig.invoiceStates.DRAFT]: 'Nouvelle facture',
      [AppConfig.invoiceStates.SAVED]: 'Facture N° %{number}',
      [AppConfig.invoiceStates.SENT]: 'Facture N° %{number}',
    },
  },

  settings: {
    settings: 'Paramètres',
    general: 'Général',
  }
};