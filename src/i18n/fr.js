import AppConfig from "AppConfig";

export default {
  hello: 'Bonjour',

  common: {
    actions: 'Actions',
    add: 'Ajouter',
    archive: 'Archiver',
    cancel: 'Annuler',
    confirm: 'Je confirme',
    createdAt: 'Créé le',
    edit: 'Modifier',
    goBack: 'Retour',
    noDataToShow: 'Aucune donnée à afficher',
    ok: 'Ok',
    restore: 'Restaurer',
    save: 'Enregistrer',
    select: 'Sélectionner',
    validate: 'Valider',
    delete: 'Supprimer',
    download: 'Télécharger',
  },

  landing: {
    home: 'Accueil',
    headerTitle: 'Weekyn, <br /> L\'ERP simple pour freelances et indépendants',
    headerDescription: 'De la gestion de vos Comptes Rendus d\'Activité (CRA), à la facturation de vos clients, Weekyn vous accompagne chaque jour pour vous simplifier vie. Générez vos factures à partir de vos CRA !',
    headerCTA: 'Je veux découvrir',
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

  firebaseErrors: {
    'auth/email-already-in-use': 'Cette adresse email est déjà utilisée',
    'auth/invalid-email': 'Adresse email invalide',
    'auth/weak-password': 'Le mot de passe est trop faible, il doit contenir au moins 6 caractères',
  },

  login: {
    authenticate: 'Se connecter',
    email: 'Email',
    password: 'Mot de passe',
    forgotPassword: 'Mot de passe oublié ?',
    signup: 'Pas de compte ? Inscription',
    signout: 'Se déconnecter',
    resetMyPassword: 'Réinitialiser mon mot de passe',
    backToAuthentication: 'Retour à la connexion',
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
    activityReport: 'Rapport d\'activité',
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