import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SmartBus360 Uncaught Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-surface dark:bg-slate-950 text-on-surface dark:text-slate-100 font-sans">
          <div className="max-w-lg w-full bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 rounded-[28px] p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-error/10 text-error mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">report_problem</span>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-error">System Diagnostic Alert</span>
              <h1 className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">Something went wrong</h1>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-2">
                An unhandled application error occurred. Don't worry, platform logs have captured this diagnostic event.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-surface-container-low dark:bg-slate-800/80 rounded-2xl text-left text-[11px] font-mono text-outline dark:text-slate-300 overflow-x-auto border border-surface-container dark:border-slate-700 max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/command-center'}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-outline/30 text-on-surface dark:text-slate-300 font-semibold text-xs hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-outline/30 text-on-surface dark:text-slate-300 font-semibold text-xs hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

