import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./styles.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="grid min-h-screen place-items-center bg-ink-950 p-6 text-white">
          <section className="max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 p-6">
            <h1 className="text-2xl font-bold">HelperAI could not start</h1>
            <p className="mt-3 text-sm text-red-100">{this.state.error.message}</p>
            <p className="mt-4 text-sm text-slate-300">Open the browser console for the full error details.</p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
