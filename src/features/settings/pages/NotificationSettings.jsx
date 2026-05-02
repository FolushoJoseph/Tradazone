import { useState } from 'react';
import { Mail, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { sendInvoiceToCustomer } from '../../../services/emailService';
import Toggle from '../../../components/forms/Toggle';
import Input from '../../../components/forms/Input';
import Button from '../../../components/forms/Button';

const notificationOptions = [
    { id: 'payments', title: 'Payment Received', description: 'Get notified when you receive a payment' },
    { id: 'invoices', title: 'Invoice Updates', description: 'Get notified when invoice status changes' },
    { id: 'checkouts', title: 'Checkout Activity', description: 'Get notified about checkout page views and payments' },
    { id: 'marketing', title: 'Marketing & Updates', description: 'Receive product updates and promotional content' },
];

const ENV = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    templateInvoice: import.meta.env.VITE_EMAILJS_TEMPLATE_INVOICE,
    templateReceipt: import.meta.env.VITE_EMAILJS_TEMPLATE_RECEIPT,
};

function mask(val) {
    if (!val) return <span className="text-error font-semibold">MISSING</span>;
    const s = String(val);
    return <span className="font-mono text-t-primary">{s.slice(0, 4)}…{s.slice(-4)}</span>;
}

function EnvRow({ label, value }) {
    const ok = !!value;
    return (
        <div className="flex items-center justify-between py-1.5 text-xs border-b border-border last:border-b-0">
            <span className="text-t-muted font-mono">{label}</span>
            <span className={`flex items-center gap-1.5 ${ok ? 'text-success' : 'text-error'}`}>
                {ok ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                {mask(value)}
            </span>
        </div>
    );
}

function NotificationSettings() {
    const [settings, setSettings] = useState({ payments: true, invoices: true, checkouts: false, marketing: false });
    const [emailEnabled, setEmailEnabled] = useState(!!(ENV.serviceId && ENV.publicKey));
    const [testEmail, setTestEmail] = useState('');
    const [testStatus, setTestStatus] = useState(null); // null | 'loading' | 'ok' | 'err'
    const [testError, setTestError] = useState('');
    const [showEnvCheck, setShowEnvCheck] = useState(false);

    const isEmailConfigured = !!(ENV.serviceId && ENV.publicKey && ENV.templateInvoice);
    const allVarsLoaded = !!(ENV.serviceId && ENV.publicKey && ENV.templateInvoice && ENV.templateReceipt);

    const handleToggle = (id) => setSettings({ ...settings, [id]: !settings[id] });
    const handleSubmit = (e) => { e.preventDefault(); };

    const handleTestEmail = async (e) => {
        e.preventDefault();
        if (!testEmail) return;
        setTestStatus('loading');
        setTestError('');
        try {
            const result = await sendInvoiceToCustomer({
                customer: 'Test User',
                customerEmail: testEmail,
                id: 'TEST-001',
                amount: '100',
                currency: 'STRK',
                dueDate: new Date().toISOString().split('T')[0],
                paymentLink: window.location.origin,
                senderName: 'Tradazone',
            });
            if (result.success) {
                setTestStatus('ok');
            } else {
                setTestStatus('err');
                setTestError(result.error || 'Unknown error');
            }
        } catch (err) {
            setTestStatus('err');
            setTestError(err?.message || String(err));
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>

            {/* EmailJS status banner */}
            <div className={`p-4 border mb-4 flex items-start gap-3 ${isEmailConfigured ? 'bg-success-bg border-success/20' : 'bg-warning-bg border-warning/20'}`}>
                <Mail size={18} className={`flex-shrink-0 mt-0.5 ${isEmailConfigured ? 'text-success' : 'text-warning'}`} />
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isEmailConfigured ? 'text-success' : 'text-warning'}`}>
                        {isEmailConfigured ? 'EmailJS is configured' : 'EmailJS not configured'}
                    </p>
                    <p className="text-xs text-t-muted mt-0.5">
                        {isEmailConfigured
                            ? 'Transactional emails (invoice send, payment receipt) are active.'
                            : 'Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_PUBLIC_KEY, and template IDs in your .env.local to enable email delivery.'}
                    </p>
                </div>
                <button
                    onClick={() => setShowEnvCheck((v) => !v)}
                    className="flex items-center gap-1 text-xs text-t-muted hover:text-t-primary transition-colors flex-shrink-0 mt-0.5"
                >
                    {showEnvCheck ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {allVarsLoaded ? 'All vars OK' : 'Check vars'}
                </button>
            </div>

            {/* Env variable detail panel */}
            {showEnvCheck && (
                <div className="bg-white border border-border p-4 mb-4 text-xs">
                    <p className="font-medium text-t-primary mb-3">Environment Variables</p>
                    <EnvRow label="VITE_EMAILJS_SERVICE_ID" value={ENV.serviceId} />
                    <EnvRow label="VITE_EMAILJS_PUBLIC_KEY" value={ENV.publicKey} />
                    <EnvRow label="VITE_EMAILJS_TEMPLATE_INVOICE" value={ENV.templateInvoice} />
                    <EnvRow label="VITE_EMAILJS_TEMPLATE_RECEIPT" value={ENV.templateReceipt} />
                    {!allVarsLoaded && (
                        <p className="mt-3 text-warning text-xs">
                            Missing vars must be added to <code className="bg-page px-1 py-0.5">.env.local</code> at the project root and the dev server restarted.
                        </p>
                    )}
                    {allVarsLoaded && (
                        <p className="mt-3 text-success text-xs">All 4 environment variables are loaded correctly.</p>
                    )}
                </div>
            )}

            {/* Email toggle + test */}
            <div className="bg-white border border-border p-5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="block text-sm font-medium text-t-primary">Email Notifications</span>
                        <span className="block text-xs text-t-muted mt-0.5">
                            Send transactional emails via EmailJS (max 200/month on free tier)
                        </span>
                    </div>
                    <Toggle
                        checked={emailEnabled && isEmailConfigured}
                        onChange={() => setEmailEnabled((v) => !v)}
                        disabled={!isEmailConfigured}
                    />
                </div>

                {isEmailConfigured && emailEnabled && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <form onSubmit={handleTestEmail} className="flex gap-3">
                            <Input
                                placeholder="Send a test email to…"
                                type="email"
                                value={testEmail}
                                onChange={(e) => { setTestEmail(e.target.value); setTestStatus(null); setTestError(''); }}
                                className="flex-1"
                            />
                            <Button
                                type="submit"
                                variant="secondary"
                                loading={testStatus === 'loading'}
                                disabled={testStatus === 'loading' || !testEmail}
                                size="medium"
                            >
                                {testStatus === 'loading' ? 'Sending…' : 'Send Test'}
                            </Button>
                        </form>

                        {testStatus === 'ok' && (
                            <div className="mt-3 flex items-start gap-2 p-3 bg-success-bg border border-success/20 text-sm text-success">
                                <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-medium">Test email sent successfully</span>
                                    <p className="text-xs mt-0.5 text-t-muted">
                                        Check <strong>{testEmail}</strong> inbox (and spam folder). If it arrived, EmailJS is working correctly.
                                    </p>
                                </div>
                            </div>
                        )}

                        {testStatus === 'err' && (
                            <div className="mt-3 p-3 bg-error-bg border border-error/20 text-sm">
                                <div className="flex items-start gap-2 text-error mb-2">
                                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                                    <span className="font-medium">Test email failed</span>
                                </div>
                                {testError && (
                                    <pre className="text-xs text-error bg-white border border-error/20 p-2 rounded overflow-x-auto whitespace-pre-wrap mb-3">
                                        {testError}
                                    </pre>
                                )}
                                <p className="text-xs font-medium text-t-primary mb-1.5">Checklist to resolve:</p>
                                <ol className="text-xs text-t-muted list-decimal list-inside space-y-1">
                                    <li>In EmailJS dashboard → <strong>Email Services</strong>, confirm your Gmail/Outlook service is connected and status is <em>Active</em>.</li>
                                    <li>Open template <strong>{ENV.templateInvoice}</strong> → <strong>To Email</strong> field must be exactly <code className="bg-page px-1">{'{{to_email}}'}</code>.</li>
                                    <li>Confirm your EmailJS account email is verified (check inbox for a verification link).</li>
                                    <li>Check your EmailJS free plan hasn't hit the 200 email/month limit.</li>
                                    <li>If error mentions <em>403</em> or <em>origin</em>, add <code className="bg-page px-1">localhost</code> to your EmailJS allowed origins list.</li>
                                </ol>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Per-notification toggles */}
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-0">
                    {notificationOptions.map((option) => (
                        <div key={option.id} className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
                            <div>
                                <span className="block text-sm font-medium text-t-primary">{option.title}</span>
                                <span className="block text-xs text-t-muted mt-0.5">{option.description}</span>
                            </div>
                            <Toggle checked={settings[option.id]} onChange={() => handleToggle(option.id)} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-end pt-6">
                    <Button type="submit" variant="primary">Save Preferences</Button>
                </div>
            </form>
        </div>
    );
}

export default NotificationSettings;
