export default {
  appName: 'Weekyn',

  defaultLocale: 'fr',

  drawerWidth: 130,
  contentWidth: 1290,

  routePaths: {
    landingPage: '/',
    login: '/login',
    signup: '/signup',
    passwordReset: '/password-reset',
    homepage: '/app',
    clients: '/app/clients',
    clientsArchived: '/app/clients/archived',
    clientAdd: '/app/clients/add',
    clientDetails: '/app/clients/:id',
    activity: '/app/activity',
    invoices: '/app/invoices',
    newInvoice: '/app/invoices/new',
    settings: '/app/settings',
  },

  invoiceStates: {
    DRAFT: 0,
    SAVED: 1,
    SENT: 2,
  }
};
