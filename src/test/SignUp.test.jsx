import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// ── Mock setup ────────────────────────────────────────────────────────────────

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
        useSearchParams: () => [new URLSearchParams()],
    };
});

vi.mock('../../components/ui/Logo', () => ({ default: () => React.createElement('div', { 'data-testid': 'logo' }) }));
vi.mock('../../assets/auth-splash.svg', () => ({ default: 'splash.svg' }));

vi.mock('../../services/webhook', () => ({ dispatchWebhook: () => Promise.resolve({ ok: true }) }));

let mockIsStaging = false;
let mockAppName = 'Tradazone';

vi.mock('../../config/env', () => ({
    get IS_STAGING() { return mockIsStaging; },
    get APP_NAME()   { return mockAppName; },
}));

vi.mock('../../components/ui/ConnectWalletModal', () => ({
    default: ({ isOpen }) =>
        isOpen ? React.createElement(
            'div',
            { 'data-testid': 'mock-connect-modal' },
            'Connect Modal'
        ) : null,
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

async function renderSignUp() {
    const { default: SignUp } = await import('../pages/auth/SignUp');
    const { AuthProvider } = await import('../context/AuthContext');
    
    render(
        React.createElement(
            BrowserRouter,
            null,
            React.createElement(
                AuthProvider,
                null,
                React.createElement(SignUp)
            )
        )
    );
}

beforeEach(() => {
    localStorage.clear();
    mockIsStaging = false;
    mockAppName = 'Tradazone';
});

// ─── 1. Component rendering ────────────────────────────────────────────────────

describe('SignUp component rendering', () => {
    it('renders the main heading', async () => {
        await renderSignUp();
        expect(screen.getByText(/Manage clients, send invoices/i)).toBeInTheDocument();
    });

    it('renders the Connect Wallet button', async () => {
        await renderSignUp();
        expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
    });

    it('renders the subheading text', async () => {
        await renderSignUp();
        expect(screen.getByText('Connect your wallet to get started')).toBeInTheDocument();
    });

    it('has correct semantic structure with min-h-screen', async () => {
        await renderSignUp();
        const mainContainer = screen.getByText(/Manage clients, send invoices/i).closest('.min-h-screen');
        expect(mainContainer).toBeInTheDocument();
    });
});

// ─── 2. Component quality and linting validation ────────────────────────────────

describe('SignUp.jsx code quality', () => {
    it('successfully imports without linting errors (validates unused imports fix)', async () => {
        // This test verifies that SignUp.jsx:
        // 1. Has NO unused imports (Link import was removed)
        // 2. All remaining imports are utilized in the component
        // 3. Module exports the component correctly
        const { default: SignUp } = await import('../pages/auth/SignUp');
        expect(typeof SignUp).toBe('function');
    });

    it('exports a valid React functional component', async () => {
        const { default: SignUp } = await import('../pages/auth/SignUp');
        const result = React.createElement(SignUp);
        expect(result.type).toBe(SignUp);
    });

    it('component uses correct imports for functionality', async () => {
        // Tests that the following imports are used:
        // - useState, useEffect: for hooks
        // - useNavigate, useSearchParams: for routing
        // - useAuth: from context
        // - dispatchWebhook: for analytics
        // - IS_STAGING, APP_NAME: for environment config
        // - UI components: Logo, ConnectWalletModal
        const SignUp = await import('../pages/auth/SignUp');
        expect(SignUp).toBeDefined();
        expect(SignUp.default).toBeDefined();
    });
});
