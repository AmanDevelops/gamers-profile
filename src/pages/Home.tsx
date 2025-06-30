function Home() {
  return (
    <div className="min-h-screen">
      <div className="container">
        <div className="hero-content">
          <div className="icon-container">
            <i data-lucide="tower-control" className="hero-icon"></i>
          </div>
          <h1 className="gradient-text">Your Gaming Legacy</h1>
          <p className="hero-description">
            Create your ultimate gaming profile, showcase your achievements, and
            connect with fellow gamers
          </p>
          <div className="button-group">
            <button className="btn btn-primary">Create Your Profile</button>
            <button className="btn btn-secondary">Explore Profiles</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="features-grid">
          <div className="feature-card">
            <i data-lucide="trophy" className="feature-icon"></i>
            <h3>Track Achievements</h3>
            <p>
              Showcase your gaming accomplishments and completion rates across
              all platforms
            </p>
          </div>
          <div className="feature-card">
            <i data-lucide="users" className="feature-icon"></i>
            <h3>Connect with Gamers</h3>
            <p>
              Find and follow other gamers who share your interests and gaming
              style
            </p>
          </div>
          <div className="feature-card">
            <i data-lucide="activity" className="feature-icon"></i>
            <h3>Live Statistics</h3>
            <p>
              Real-time updates of your gaming sessions and progress tracking
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Create Your Profile</h3>
              <p>
                Sign up and customize your gaming profile with your favorite
                games, achievements, and stats
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Connect Your Accounts</h3>
              <p>
                Link your gaming accounts from different platforms to
                automatically sync your progress
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Share Your Journey</h3>
              <p>
                Show off your gaming achievements and connect with a community
                of passionate gamers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="cta-section">
          <h2>Ready to Start Your Gaming Journey?</h2>
          <p>
            Join thousands of gamers who are already tracking their progress and
            sharing their achievements
          </p>
          <button className="btn btn-white">Get Started Now</button>
        </div>
      </div>
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <i data-lucide="tower-control" className="footer-icon"></i>
              <span>GamingProfile</span>
            </div>
            <div className="footer-links">
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
            <p className="copyright">
              © 2025 GamingProfile. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
