
export function getInvoices() {
  return {
    type: 'FETCH_INVOICES',
  };
}

export function saveInvoice(invoice, projectId, year = null, month = null) {
  return {
    type: 'SAVE_INVOICE',
    payload: { invoice, projectId, year, month },
  };
}

export function deleteInvoice(invoiceId) {
  return {
    type: 'DELETE_INVOICE',
    payload: { invoiceId },
  };
}
