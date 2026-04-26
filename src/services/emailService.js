import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TEMPLATE_INVOICE = import.meta.env.VITE_EMAILJS_TEMPLATE_INVOICE;
const TEMPLATE_RECEIPT = import.meta.env.VITE_EMAILJS_TEMPLATE_RECEIPT;

let _initialized = false;

function ensureInit() {
    if (!_initialized && PUBLIC_KEY) {
        emailjs.init(PUBLIC_KEY);
        _initialized = true;
    }
}

async function sendWithRetry(templateId, params, maxRetries = 2) {
    ensureInit();

    if (!SERVICE_ID || !PUBLIC_KEY || !templateId) {
        return { success: false, error: 'EmailJS not configured. Set VITE_EMAILJS_* env vars.' };
    }

    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            await emailjs.send(SERVICE_ID, templateId, params);
            return { success: true };
        } catch (err) {
            lastError = err;
            if (attempt < maxRetries) {
                await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
            }
        }
    }
    return { success: false, error: lastError?.text || lastError?.message || 'Email send failed' };
}

// Send invoice to customer with payment link
export async function sendInvoiceToCustomer(invoice) {
    return sendWithRetry(TEMPLATE_INVOICE, {
        to_name: invoice.customer,
        to_email: invoice.customerEmail,
        invoice_id: invoice.id,
        invoice_amount: invoice.amount,
        invoice_currency: invoice.currency,
        invoice_due_date: invoice.dueDate,
        payment_link: invoice.paymentLink || '',
        sender_name: invoice.senderName || 'Tradazone',
    });
}

// Send copy of sent invoice back to the merchant
export async function sendInvoiceConfirmationToSender(invoice) {
    return sendWithRetry(TEMPLATE_INVOICE, {
        to_name: invoice.senderName || 'Tradazone',
        to_email: invoice.senderEmail,
        invoice_id: invoice.id,
        invoice_customer: invoice.customer,
        invoice_amount: invoice.amount,
        invoice_currency: invoice.currency,
        invoice_due_date: invoice.dueDate,
        payment_link: invoice.paymentLink || '',
        sender_name: invoice.senderName || 'Tradazone',
    });
}

// Notify merchant that payment was received
export async function sendPaymentReceivedToSender(invoice, tx) {
    return sendWithRetry(TEMPLATE_RECEIPT, {
        to_name: invoice.senderName || 'Tradazone',
        to_email: invoice.senderEmail,
        invoice_id: invoice.id,
        invoice_customer: invoice.customer,
        tx_hash: tx.hash,
        tx_amount: tx.amount,
        tx_currency: tx.currency,
        tx_network: tx.network,
        paid_at: new Date().toLocaleString(),
    });
}

// Send payment receipt to customer
export async function sendPaymentReceiptToCustomer(invoice, tx) {
    return sendWithRetry(TEMPLATE_RECEIPT, {
        to_name: invoice.customer,
        to_email: invoice.customerEmail,
        invoice_id: invoice.id,
        tx_hash: tx.hash,
        tx_amount: tx.amount,
        tx_currency: tx.currency,
        tx_network: tx.network,
        paid_at: new Date().toLocaleString(),
        sender_name: invoice.senderName || 'Tradazone',
    });
}
