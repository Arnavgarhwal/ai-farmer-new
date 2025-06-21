import React, { useState } from 'react';
import MonkeyPasswordInput from './MonkeyPasswordInput';

const MonkeyPasswordDemo: React.FC = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password3, setPassword3] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
      padding: '40px 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#16a34a',
          textAlign: 'center',
          marginBottom: '8px',
          fontSize: '32px',
          fontWeight: '700'
        }}>
          🐒 Monkey Password Input Demo
        </h1>
        
        <p style={{
          textAlign: 'center',
          color: '#6B7280',
          marginBottom: '40px',
          fontSize: '16px',
          lineHeight: '1.6'
        }}>
          Watch the monkey close its eyes when you type and open them when you show the password!
        </p>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ color: '#374151', marginBottom: '12px', fontSize: '18px' }}>
            🎯 How it works:
          </h3>
          <ul style={{ color: '#6B7280', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>👁️ <strong>Eyes closed:</strong> When you're typing or password is hidden</li>
            <li>👀 <strong>Eyes open:</strong> When you click the monkey to show password</li>
            <li>😊 <strong>Smile appears:</strong> When password is visible</li>
            <li>✨ <strong>Eye shine:</strong> Added sparkle when eyes are open</li>
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontWeight: '600'
            }}>
              Example 1: Basic Password Input
            </label>
            <MonkeyPasswordInput
              value={password1}
              onChange={setPassword1}
              placeholder="Enter your password"
            />
            <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
              Try typing here and watch the monkey's eyes close!
            </p>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontWeight: '600'
            }}>
              Example 2: Required Field
            </label>
            <MonkeyPasswordInput
              value={password2}
              onChange={setPassword2}
              placeholder="Required password field"
              required
            />
            <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
              This field is required - click the monkey to show/hide password
            </p>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontWeight: '600'
            }}>
              Example 3: Custom Styled
            </label>
            <MonkeyPasswordInput
              value={password3}
              onChange={setPassword3}
              placeholder="Custom styled input"
              style={{
                border: '2px solid #16a34a',
                backgroundColor: '#f0fdf4'
              }}
            />
            <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
              This input has custom styling with green border and light green background
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{ color: '#374151', marginBottom: '12px', fontSize: '16px' }}>
            💡 Features:
          </h4>
          <ul style={{ color: '#6B7280', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
            <li>🎨 <strong>Responsive design</strong> - Works on all screen sizes</li>
            <li>⚡ <strong>Smooth animations</strong> - Eye movements and hover effects</li>
            <li>🔒 <strong>Secure by default</strong> - Password hidden until explicitly shown</li>
            <li>🎯 <strong>Accessible</strong> - Keyboard navigation and screen reader support</li>
            <li>🎪 <strong>Fun interaction</strong> - Makes password input more engaging</li>
          </ul>
        </div>

        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          padding: '16px',
          backgroundColor: '#fef3c7',
          borderRadius: '8px',
          border: '1px solid #f59e0b'
        }}>
          <p style={{ color: '#92400e', margin: 0, fontSize: '14px' }}>
            🎉 <strong>Try it out!</strong> Type in any of the password fields above and watch the monkey animation in action!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonkeyPasswordDemo; 