// src/components/invoice/InvoiceDetail.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { InvoiceDetail, __testing } from './InvoiceDetail';
import { performanceMonitor } from '../../utils/performanceMonitor';

// Mock performance monitor
jest.mock('../../utils/performanceMonitor');
const mockPerformanceMonitor = performanceMonitor as jest.Mocked<typeof performanceMonitor>;

describe('InvoiceDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('should track bundle size on mount', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 'INV-001',
        amount: 1000,
        items: [],
        metadata: {}
      }),
      headers: new Headers({ 'content-length': '500' })
    });

    render(<InvoiceDetail invoiceId="INV-001" />);
    
    await waitFor(() => {
      expect(mockPerformanceMonitor.trackComponentMount).toHaveBeenCalledWith(
        'InvoiceDetail',
        expect.any(Object)
      );
    });
  });

  it('should track render time', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 'INV-001',
        amount: 1000,
        items: [],
        metadata: {}
      }),
      headers: new Headers()
    });

    render(<InvoiceDetail invoiceId="INV-001" />);
    
    await waitFor(() => {
      expect(mockPerformanceMonitor.trackRenderTime).toHaveBeenCalled();
    });
  });

  it('should alert on large API responses', async () => {
    const largeResponse = new Array(20000).fill('x').join('');
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: largeResponse }),
      headers: new Headers({ 'content-length': '150000' }) // 150KB
    });

    render(<InvoiceDetail invoiceId="INV-001" />);
    
    await waitFor(() => {
      expect(mockPerformanceMonitor.sendAlert).toHaveBeenCalledWith(
        expect.objectContaining({
          metric: 'api_response_size',
          level: 'warning'
        })
      );
    });
  });

  it('should virtualize large item lists', async () => {
    const items = Array.from({ length: 100 }, (_, i) => ({
      id: `item-${i}`,
      description: `Item ${i}`,
      quantity: 1,
      price: 100
    }));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 'INV-001',
        amount: 10000,
        items,
        metadata: {}
      }),
      headers: new Headers()
    });

    render(<InvoiceDetail invoiceId="INV-001" />);
    
    await waitFor(() => {
      expect(screen.getByText(/Large invoice detected/i)).toBeInTheDocument();
      // Should only show first 20 items
      expect(screen.getAllByText(/Item \d+/i)).toHaveLength(20);
    });
  });
});

describe('ComponentSizeMonitor', () => {
  const { ComponentSizeMonitor } = __testing;

  it('should measure bundle size and alert when exceeding limits', async () => {
    // Mock performance entries
    const mockEntry = {
      name: 'InvoiceDetail.js',
      transferSize: 150 * 1024 // 150KB
    };
    
    jest.spyOn(performance, 'getEntriesByType').mockReturnValue([mockEntry as PerformanceResourceTiming]);
    
    const monitor = ComponentSizeMonitor.initialize('TestComponent');
    
    await monitor['measureBundleSize']();
    
    expect(mockPerformanceMonitor.sendAlert).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'critical',
        component: 'TestComponent',
        metric: 'bundle_size',
        value: 150
      })
    );
  });
});