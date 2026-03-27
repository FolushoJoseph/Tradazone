// src/utils/performanceMonitor.ts
/**
 * Performance Monitoring Utility
 * Tracks bundle sizes, render times, and component metrics
 */

type AlertLevel = 'info' | 'warning' | 'critical';

interface AlertPayload {
  level: AlertLevel;
  component: string;
  metric: string;
  value: number;
  threshold: number;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

interface PerformanceMetric {
  component: string;
  metric: string;
  value: number;
  timestamp: number;
  context?: Record<string, unknown>;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private readonly MAX_METRICS = 1000;
  private readonly ALERT_ENDPOINT = process.env.REACT_APP_MONITORING_ENDPOINT;

  private constructor() {
    // Send metrics periodically in production
    if (process.env.NODE_ENV === 'production') {
      setInterval(() => this.flushMetrics(), 60000); // Every minute
    }
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  trackBundleSize(component: string, sizeKB: number): void {
    this.addMetric(component, 'bundle_size', sizeKB);
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Bundle] ${component}: ${sizeKB.toFixed(2)}KB`);
    }
  }

  trackRenderTime(component: string, timeMs: number): void {
    this.addMetric(component, 'render_time', timeMs);
  }

  trackComponentMount(component: string, context?: Record<string, unknown>): void {
    this.addMetric(component, 'mount', 1, context);
  }

  trackComponentUnmount(component: string): void {
    this.addMetric(component, 'unmount', 1);
  }

  trackPropChange(component: string, propName: string): void {
    this.addMetric(component, `prop_change_${propName}`, 1);
  }

  trackApiCall(endpoint: string, durationMs: number, responseSize: number): void {
    this.addMetric('API', `api_call_${endpoint}`, durationMs, {
      responseSize,
      endpoint
    });
  }

  trackError(component: string, error: Error): void {
    this.addMetric(component, 'error', 1, {
      message: error.message,
      stack: error.stack
    });
  }

  trackUserAction(action: string): void {
    this.addMetric('UserAction', action, 1);
  }

  trackLoadingTime(component: string, timeMs: number): void {
    this.addMetric(component, 'loading_time', timeMs);
  }

  trackDynamicImport(moduleName: string): void {
    this.addMetric('DynamicImport', moduleName, 1);
  }

  sendAlert(payload: AlertPayload): void {
    console.error('[PERFORMANCE ALERT]', payload);
    
    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production' && this.ALERT_ENDPOINT) {
      fetch(this.ALERT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(console.error);
    }
  }

  reportBundleSize(component: string, sizeKB: number): void {
    this.trackBundleSize(component, sizeKB);
  }

  private addMetric(
    component: string, 
    metric: string, 
    value: number, 
    context?: Record<string, unknown>
  ): void {
    const metricData: PerformanceMetric = {
      component,
      metric,
      value,
      timestamp: Date.now(),
      context
    };
    
    this.metrics.push(metricData);
    
    // Trim metrics if exceeding max
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS);
    }
    
    // In development, log metrics
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Performance]', metricData);
    }
  }

  private flushMetrics(): void {
    if (this.metrics.length === 0) return;
    
    const metricsToSend = [...this.metrics];
    this.metrics = [];
    
    // Send to monitoring endpoint
    if (this.ALERT_ENDPOINT) {
      fetch(this.ALERT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics: metricsToSend }),
        keepalive: true
      }).catch(console.error);
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();