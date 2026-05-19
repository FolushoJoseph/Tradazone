/// <reference types="vite/client" />
/**
 * emailService.ts — sends transactional emails via EmailJS.
 * No domain ownership required; emails are sent through your connected Gmail account.
 */

import emailjs from '@emailjs/browser';

const SERVICE_ID   = import.meta.env.VITE_EMAILJS_SERVICE_ID   ?? '';
const PUBLIC_KEY   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY   ?? '';
const TMPL_INVOICE = import.meta.env.VITE_EMAILJS_TEMPLATE_INVOICE ?? '';
const TMPL_RECEIPT = import.meta.env.VITE_EMAILJS_TEMPLATE_RECEIPT ?? '';

const APP_BASE = 'https://tradazone.github.io/Tradazone';

interface EmailResult { success: boolean; error?: string; }
interface InvoiceLike { id: string; customer: string; amount: string; currency: string; dueDate: string; items?: Array<{ name: string }>; customerEmail?: string; senderEmail?: string; senderName?: string; }
interface TxLike     { hash?: string; amount?: string; currency?: string; network?: string; }

function isConfigured() {
  return SERVICE_ID && PUBLIC_KEY && TMPL_INVOICE && TMPL_RECEIPT;
}

async function send(templateId: string, params: Record<string, string>): Promise<EmailResult> {
  if (!isConfigured()) {
    if (import.meta.env.DEV) console.warn('[emailService] EmailJS env vars not set — email skipped');
    return { success: false, error: 'Email service not configured' };
  }
  try {
    await emailjs.send(SERVICE_ID, templateId, params, PUBLIC_KEY);
    if (import.meta.env.DEV) console.log('[emailService] sent via template', templateId);
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (import.meta.env.DEV) console.error('[emailService] error:', msg);
    return { success: false, error: msg };
  }
}

export async function sendInvoiceToCustomer(invoice: InvoiceLike): Promise<EmailResult> {
  return send(TMPL_INVOICE, {
    to_name:              invoice.customer,
    to_email:             invoice.customerEmail ?? '',
    invoice_id:           invoice.id,
    invoice_amount:       invoice.amount,
    invoice_currency:     invoice.currency,
    invoice_due_date:     invoice.dueDate,
    payment_link:         `${APP_BASE}/pay/invoice/${invoice.id}`,
    invoice_preview_link: `${APP_BASE}/invoice/${invoice.id}`,
    sender_name:          invoice.senderName ?? 'Tradazone',
    item_description:     invoice.items?.[0]?.name ?? '',
  });
}

export async function sendInvoiceConfirmationToSender(invoice: InvoiceLike): Promise<EmailResult> {
  return send(TMPL_RECEIPT, {
    to_name:          invoice.senderName ?? 'Tradazone',
    to_email:         invoice.senderEmail ?? '',
    invoice_id:       invoice.id,
    invoice_amount:   invoice.amount,
    invoice_currency: invoice.currency,
    invoice_due_date: invoice.dueDate,
    sender_name:      invoice.senderName ?? 'Tradazone',
    item_description: invoice.items?.[0]?.name ?? '',
    tx_hash:          '',
    tx_amount:        invoice.amount,
    tx_currency:      invoice.currency,
    tx_network:       '',
    paid_at:          '',
  });
}

export async function sendPaymentReceivedToSender(invoice: InvoiceLike, tx: TxLike): Promise<EmailResult> {
  return send(TMPL_RECEIPT, {
    to_name:          invoice.senderName ?? 'Tradazone',
    to_email:         invoice.senderEmail ?? '',
    invoice_id:       invoice.id,
    invoice_customer: invoice.customer,
    tx_hash:          tx.hash ?? '',
    tx_amount:        tx.amount ?? '',
    tx_currency:      tx.currency ?? '',
    tx_network:       tx.network ?? '',
    paid_at:          new Date().toLocaleString(),
    invoice_amount:   invoice.amount,
    invoice_currency: invoice.currency,
    invoice_due_date: invoice.dueDate,
    sender_name:      invoice.senderName ?? 'Tradazone',
    item_description: invoice.items?.[0]?.name ?? '',
  });
}

export async function sendPaymentReceiptToCustomer(invoice: InvoiceLike, tx: TxLike): Promise<EmailResult> {
  return send(TMPL_RECEIPT, {
    to_name:          invoice.customer,
    to_email:         invoice.customerEmail ?? '',
    invoice_id:       invoice.id,
    tx_hash:          tx.hash ?? '',
    tx_amount:        tx.amount ?? '',
    tx_currency:      tx.currency ?? '',
    tx_network:       tx.network ?? '',
    paid_at:          new Date().toLocaleString(),
    sender_name:      invoice.senderName ?? 'Tradazone',
    invoice_amount:   invoice.amount,
    invoice_currency: invoice.currency,
    invoice_due_date: invoice.dueDate,
    item_description: invoice.items?.[0]?.name ?? '',
  });
}
