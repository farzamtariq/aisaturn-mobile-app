import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tailwind } from '@/theme';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // You can also log the error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={tailwind('flex-1 justify-center items-center p-4 bg-white')}>
          <Text style={tailwind('text-xl font-inter-semibold-20 text-gray-800 mb-4')}>
            Something went wrong
          </Text>
          <Text style={tailwind('text-md font-inter-normal-20 text-gray-600 text-center')}>
            The app encountered an unexpected error. Please restart the app.
          </Text>
          {__DEV__ && this.state.error && (
            <Text style={tailwind('text-xs text-red-600 mt-4')}>
              {this.state.error.message}
            </Text>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

