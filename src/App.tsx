const App = () => {
  return (
    <div className="app">
      <header>
        <h1>🚀 Project Template</h1>
        <p>Context Engineering Approach</p>
      </header>

      <main>
        <section className="hero">
          <h2>Welcome to Your New Project!</h2>
          <p>This template provides a complete project structure with:</p>
          <ul>
            <li>✅ Context-first documentation for AI-assisted development</li>
            <li>✅ Production-ready configurations</li>
            <li>✅ Built-in quality gates</li>
            <li>✅ Example patterns from real projects</li>
            <li>✅ Comprehensive PRPs (Product Requirements Prompts)</li>
          </ul>
        </section>

        <section className="features">
          <h2>📁 What's Included</h2>
          <div className="grid">
            <div className="card">
              <h3>PRPs/</h3>
              <p>Product Requirements Prompts templates for features</p>
            </div>
            <div className="card">
              <h3>examples/</h3>
              <p>Code patterns and best practices</p>
            </div>
            <div className="card">
              <h3>specs/</h3>
              <p>Technical specifications templates</p>
            </div>
            <div className="card">
              <h3>ai_docs/</h3>
              <p>AI assistant context documentation</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <h2>Get Started</h2>
          <p>Check out the documentation to begin building your project:</p>
          <div className="buttons">
            <a
              href="https://github.com/TortoiseWolfe/001_Template"
              className="button"
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/TortoiseWolfe/001_Template/blob/main/TEMPLATE_README.md"
              className="button secondary"
            >
              Read Documentation
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>Built with Context Engineering principles</p>
        <p>
          Template abstracted from{' '}
          <a href="https://github.com/TortoiseWolfe/Resume">
            TortoiseWolfe/Resume
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
