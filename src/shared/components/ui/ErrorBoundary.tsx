import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertaBanner } from "./AlertaBanner";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };
 
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary capturó:", error);
    console.error("Component stack:", info.componentStack);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <AlertaBanner
          tipo="error"
          mensaje="Algo salió mal en esta sección"
          descripcion={this.state.error?.message ?? "Error inesperado"}
          accion={{ label: "Reintentar", onClick: this.reset }}
        />
      );
    }

    return this.props.children;
  }
}