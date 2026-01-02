import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CommandPaletteWrapper } from './components/Utilities/CommandPaletteWrapper';
import { CustomCursorWrapper } from './components/Utilities/CustomCursorWrapper';
import ParticleBackground from './components/Utilities/ParticleBackground';
import SpotlightCursor from './components/Utilities/SpotlightCursor';
import TerminalLoadingScreen from './components/Utilities/TerminalLoadingScreen';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import './styles/globals.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px', background: '#0a0a0f', color: '#fff', minHeight: '100vh' }}>
          <h1>Something went wrong</h1>
          <p style={{ color: '#ff6b6b' }}>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '20px' }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  if (!loadingComplete) {
    return <TerminalLoadingScreen onComplete={() => setLoadingComplete(true)} />;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CommandPaletteWrapper>
          <CustomCursorWrapper>
            <SpotlightCursor />
            <ParticleBackground />
            <ScrollProgress />
            <div className="app">
              <Navigation />
              <main className="main-content">
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
              </main>
              <Footer />
            </div>
          </CustomCursorWrapper>
        </CommandPaletteWrapper>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
