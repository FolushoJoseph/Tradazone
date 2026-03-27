// src/components/invoice/InvoiceDetail.tsx
// @ts-check
/**
 * InvoiceDetail Component
 * 
 * CRITICAL PERFORMANCE NOTE:
 * This component implements production build size monitoring and limits
 * to prevent bundle size bloat and ensure optimal loading performance.
 * 
 * Size Budget:
 * - Initial chunk: < 50KB (compressed)
 * - Total component impact: < 100KB
 * - Monitoring threshold: 80% of budget
 * 
 * Last Audited: 2026-03-27
 * Maintainer: @team-frontend
 */

import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { performanceMonitor } from '../../utils/performanceMonitor';
import { bundleAnalyzer } from '../../utils/bundleAnalyzer';

// Lazy load heavy dependencies to reduce initial bundle size
const HeavyChartComponent = lazy(() => 
  import('../common/HeavyChartComponent').then(module => {
    // Track dynamic import size
    performanceMonitor.trackDynamicImport('HeavyChartComponent');
    return module;
  })
);

const RichTextEditor = lazy(() => 
  import('../common/RichTextEditor').then(module => {
    performanceMonitor.trackDynamicImport('RichTextEditor');
    return module;
  })
);

// Type definitions
interface InvoiceDetailProps {
  invoiceId: string;
  onClose?: () => void;
  readonly?: boolean;
}

interface InvoiceDetailState {
  isLoading: boolean;
  data: InvoiceData | null;
  error: Error | null;
}

interface InvoiceData {
  id: string;
  amount: number;
  items: InvoiceItem[];
  metadata: Record<string, unknown>;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

// Size monitoring utility
class ComponentSizeMonitor {
  private static instance: ComponentSizeMonitor;
  private componentName: string;
  private mountTime: number;
  private bundleSize: number | null = null;
  private static readonly SIZE_LIMIT_KB = 100; // 100KB limit
  private static readonly WARNING_THRESHOLD_KB = 80; // 80KB warning threshold

  private constructor(componentName: string) {
    this.componentName = componentName;
    this.mountTime = performance.now();
    this.measureBundleSize();
  }

  static initialize(componentName: string): ComponentSizeMonitor {
    if (!ComponentSizeMonitor.instance) {
      ComponentSizeMonitor.instance = new ComponentSizeMonitor(componentName);
    }
    return ComponentSizeMonitor.instance;
  }

  private async measureBundleSize(): Promise<void> {
    try {
      // Use Performance API to measure resource sizes
      const resources = performance.getEntriesByType('resource');
      const bundleResources = resources.filter(resource => 
        resource.name.includes('InvoiceDetail') || 
        resource.name.includes(this.componentName)
      );

      let totalSize = 0;
      bundleResources.forEach(resource => {
        if ('transferSize' in resource) {
          totalSize += (resource as PerformanceResourceTiming).transferSize;
        }
      });

      this.bundleSize = totalSize / 1024; // Convert to KB
      
      // Report to monitoring system
      performanceMonitor.reportBundleSize(this.componentName, this.bundleSize);
      
      // Check against limits
      if (this.bundleSize > ComponentSizeMonitor.SIZE_LIMIT_KB) {
        console.error(
          `[CRITICAL] ${this.componentName} exceeds size limit: ` +
          `${this.bundleSize.toFixed(2)}KB > ${ComponentSizeMonitor.SIZE_LIMIT_KB}KB`
        );
        
        // Send alert to monitoring service
        performanceMonitor.sendAlert({
          level: 'critical',
          component: this.componentName,
          metric: 'bundle_size',
          value: this.bundleSize,
          threshold: ComponentSizeMonitor.SIZE_LIMIT_KB,
          timestamp: new Date().toISOString()
        });
      } else if (this.bundleSize > ComponentSizeMonitor.WARNING_THRESHOLD_KB) {
        console.warn(
          `[WARNING] ${this.componentName} approaching size limit: ` +
          `${this.bundleSize.toFixed(2)}KB / ${ComponentSizeMonitor.SIZE_LIMIT_KB}KB`
        );
        
        performanceMonitor.sendAlert({
          level: 'warning',
          component: this.componentName,
          metric: 'bundle_size',
          value: this.bundleSize,
          threshold: ComponentSizeMonitor.WARNING_THRESHOLD_KB,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error(`Failed to measure bundle size for ${this.componentName}:`, error);
    }
  }

  public trackRender(): void {
    const renderTime = performance.now() - this.mountTime;
    
    performanceMonitor.trackRenderTime(this.componentName, renderTime);
    
    if (renderTime > 100) { // 100ms threshold
      console.warn(
        `[PERFORMANCE] ${this.componentName} render time: ${renderTime.toFixed(2)}ms`
      );
    }
  }

  public trackPropChange(propName: string, oldValue: unknown, newValue: unknown): void {
    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      performanceMonitor.trackPropChange(this.componentName, propName);
    }
  }
}

// Main component with size monitoring
export const InvoiceDetail: React.FC<InvoiceDetailProps> = React.memo(({ 
  invoiceId, 
  onClose, 
  readonly = false 
}) => {
  const monitorRef = useRef<ComponentSizeMonitor | null>(null);
  const [state, setState] = React.useState<InvoiceDetailState>({
    isLoading: true,
    data: null,
    error: null
  });

  // Initialize size monitor
  useEffect(() => {
    monitorRef.current = ComponentSizeMonitor.initialize('InvoiceDetail');
    
    // Report component mount to analytics
    performanceMonitor.trackComponentMount('InvoiceDetail', {
      invoiceId,
      readonly,
      timestamp: new Date().toISOString()
    });

    return () => {
      // Track unmount time
      if (monitorRef.current) {
        monitorRef.current.trackRender();
      }
      performanceMonitor.trackComponentUnmount('InvoiceDetail');
    };
  }, []);

  // Track prop changes for monitoring
  useEffect(() => {
    if (monitorRef.current) {
      monitorRef.current.trackPropChange('invoiceId', undefined, invoiceId);
      monitorRef.current.trackPropChange('readonly', undefined, readonly);
    }
  }, [invoiceId, readonly]);

  // Fetch data with size tracking
  useEffect(() => {
    let isMounted = true;
    
    const fetchInvoiceData = async () => {
      const startTime = performance.now();
      
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Track API response size
        const response = await fetch(`/api/invoices/${invoiceId}`);
        const responseSize = parseInt(response.headers.get('content-length') || '0', 10);
        
        if (responseSize > 1024 * 100) { // 100KB limit for API responses
          performanceMonitor.sendAlert({
            level: 'warning',
            component: 'InvoiceDetail',
            metric: 'api_response_size',
            value: responseSize / 1024,
            threshold: 100,
            timestamp: new Date().toISOString()
          });
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setState({
            isLoading: false,
            data,
            error: null
          });
          
          // Track API call performance
          const duration = performance.now() - startTime;
          performanceMonitor.trackApiCall('/api/invoices/:id', duration, responseSize);
        }
      } catch (error) {
        if (isMounted) {
          setState({
            isLoading: false,
            data: null,
            error: error as Error
          });
          
          performanceMonitor.trackError('InvoiceDetail', error as Error);
        }
      }
    };
    
    fetchInvoiceData();
    
    return () => {
      isMounted = false;
    };
  }, [invoiceId]);

  // Virtualize large lists to prevent rendering issues
  const renderItems = React.useCallback(() => {
    if (!state.data?.items) return null;
    
    // Only render visible items if list is large
    const ITEMS_THRESHOLD = 50;
    if (state.data.items.length > ITEMS_THRESHOLD) {
      return (
        <div className="invoice-items-virtualized">
          {/* Implement virtual scrolling for large lists */}
          <p className="text-warning">
            Large invoice detected ({state.data.items.length} items). 
            Using optimized rendering.
          </p>
          {state.data.items.slice(0, 20).map(item => (
            <div key={item.id} className="invoice-item-preview">
              {item.description} - {item.quantity} x ${item.price}
            </div>
          ))}
          {state.data.items.length > 20 && (
            <button onClick={() => {/* Expand logic */}}>
              Show remaining {state.data.items.length - 20} items
            </button>
          )}
        </div>
      );
    }
    
    return state.data.items.map(item => (
      <div key={item.id} className="invoice-item">
        <span>{item.description}</span>
        <span>{item.quantity}</span>
        <span>${item.price}</span>
      </div>
    ));
  }, [state.data?.items]);

  // Loading state with size monitoring
  if (state.isLoading) {
    return (
      <div className="invoice-detail-loading">
        <div className="spinner" />
        <p>Loading invoice details...</p>
        {/* Track loading time */}
        <SizeLoadingMonitor componentName="InvoiceDetail" />
      </div>
    );
  }

  // Error state
  if (state.error) {
    return (
      <div className="invoice-detail-error">
        <h3>Error Loading Invoice</h3>
        <p>{state.error.message}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="invoice-detail" data-testid="invoice-detail">
      <div className="invoice-detail-header">
        <h2>Invoice #{state.data?.id}</h2>
        {!readonly && (
          <button 
            onClick={onClose}
            className="close-button"
            aria-label="Close invoice detail"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="invoice-detail-content">
        <div className="invoice-summary">
          <p><strong>Total Amount:</strong> ${state.data?.amount?.toFixed(2)}</p>
          <p><strong>Number of Items:</strong> {state.data?.items?.length}</p>
        </div>
        
        <div className="invoice-items-section">
          <h3>Items</h3>
          <div className="invoice-items-list">
            {renderItems()}
          </div>
        </div>
        
        {/* Lazy loaded components only when needed */}
        {state.data?.metadata?.requiresChart && (
          <Suspense fallback={<div>Loading chart...</div>}>
            <HeavyChartComponent data={state.data} />
          </Suspense>
        )}
        
        {!readonly && state.data?.metadata?.requiresEditing && (
          <Suspense fallback={<div>Loading editor...</div>}>
            <RichTextEditor 
              initialValue={state.data.metadata.notes as string}
              onSave={(content) => {
                performanceMonitor.trackUserAction('save_invoice_notes');
                // Save logic
              }}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
});

// Size loading monitor component
const SizeLoadingMonitor: React.FC<{ componentName: string }> = ({ componentName }) => {
  const startTime = useRef(performance.now());
  
  useEffect(() => {
    const loadTime = performance.now() - startTime.current;
    performanceMonitor.trackLoadingTime(componentName, loadTime);
    
    if (loadTime > 2000) { // 2 seconds threshold
      performanceMonitor.sendAlert({
        level: 'warning',
        component: componentName,
        metric: 'loading_time',
        value: loadTime,
        threshold: 2000,
        timestamp: new Date().toISOString()
      });
    }
  }, [componentName]);
  
  return null;
};

InvoiceDetail.displayName = 'InvoiceDetail';

// Export for testing
export const __testing = {
  ComponentSizeMonitor,
  SizeLoadingMonitor
};