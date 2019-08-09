
export function getInvoices() {
  return {
    type: 'FETCH_INVOICES',
  };
}

export function saveInvoice(invoice) {
  return {
    type: 'SAVE_INVOICE',
    payload: { invoice },
  };
}

export function deleteInvoice(invoiceId) {
  return {
    type: 'DELETE_INVOICE',
    payload: { invoiceId },
  };
}
