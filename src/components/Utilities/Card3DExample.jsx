import React from 'react';
import Card3D from '../Utilities/Card3D';
import './Card3DExample.css';

/**
 * Example Usage of Card3D Component
 * 
 * This shows how to use the reusable Card3D component
 * in different scenarios
 */
const Card3DExample = () => {
  return (
    <div className="card3d-examples">
      <h2>3D Card Examples</h2>
      
      {/* Example 1: Simple Card */}
      <Card3D className="example-card">
        <div className="card-header">
          <h3>Premium 3D Card</h3>
          <p>Hover to see the 3D effect</p>
        </div>
        <div className="card-body">
          <p>This card follows your cursor and tilts in 3D space.</p>
          <button className="card-button">Learn More</button>
        </div>
      </Card3D>

      {/* Example 2: Project Card */}
      <Card3D 
        className="project-card-3d"
        onClick={() => console.log('Project clicked!')}
      >
        <img 
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" 
          alt="Project"
          className="project-image-3d"
        />
        <div className="project-info">
          <h3>My Awesome Project</h3>
          <p>Built with React & Framer Motion</p>
          <div className="project-tags">
            <span className="tag">React</span>
            <span className="tag">3D</span>
            <span className="tag">Animation</span>
          </div>
        </div>
      </Card3D>

      {/* Example 3: Feature Card */}
      <Card3D className="feature-card">
        <div className="feature-icon">🚀</div>
        <h4>Fast Performance</h4>
        <p>GPU-accelerated transforms for smooth 60fps animations</p>
      </Card3D>

      {/* Example 4: Stats Card */}
      <Card3D className="stats-card">
        <div className="stat-value">1,234</div>
        <div className="stat-label">Projects Completed</div>
        <div className="stat-trend">↑ 23% this month</div>
      </Card3D>

      {/* Example 5: Custom Styled Card */}
      <Card3D 
        className="custom-card"
        style={{ maxWidth: '400px', margin: '20px auto' }}
      >
        <div style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '12px'
        }}>
          <h3>Custom Styled</h3>
          <p>You can pass any content and styling you want!</p>
        </div>
      </Card3D>
    </div>
  );
};

export default Card3DExample;
