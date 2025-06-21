import React, { useState, useEffect } from 'react';

interface MonkeyPasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  style?: React.CSSProperties;
}

const MonkeyPasswordInput: React.FC<MonkeyPasswordInputProps> = ({
  value,
  onChange,
  placeholder = "Password",
  required = false,
  style = {}
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Set typing state to true
    setIsTyping(true);
    
    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Set timeout to stop typing animation after 1 second of no input
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
    
    setTypingTimeout(timeout);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative' }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          required={required}
          style={{
            width: '100%',
            padding: '12px 16px',
            paddingRight: '50px', // Space for the monkey
            border: '1px solid #d1d5db',
            borderRadius: 8,
            fontSize: 16,
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            ...style
          }}
        />
        
        {/* Monkey Animation */}
        <div
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: isHovered ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(1)',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            borderRadius: '50%',
            backgroundColor: isHovered ? 'rgba(139, 69, 19, 0.1)' : 'transparent'
          }}
          onClick={togglePasswordVisibility}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {/* Monkey Face */}
          <div style={{
            width: '28px',
            height: '28px',
            backgroundColor: '#8B4513',
            borderRadius: '50%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}>
            {/* Eyes */}
            <div style={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center'
            }}>
              {/* Left Eye */}
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#000',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Eye lid - closes when typing or password is hidden */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '6px',
                  backgroundColor: '#8B4513',
                  borderRadius: '50%',
                  transform: (isTyping || !showPassword) ? 'translateY(0)' : 'translateY(-6px)',
                  transition: 'transform 0.3s ease',
                  zIndex: 2
                }} />
                {/* Eye shine */}
                <div style={{
                  position: 'absolute',
                  top: '1px',
                  left: '1px',
                  width: '2px',
                  height: '2px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  opacity: showPassword ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }} />
              </div>
              
              {/* Right Eye */}
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#000',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Eye lid - closes when typing or password is hidden */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '6px',
                  backgroundColor: '#8B4513',
                  borderRadius: '50%',
                  transform: (isTyping || !showPassword) ? 'translateY(0)' : 'translateY(-6px)',
                  transition: 'transform 0.3s ease',
                  zIndex: 2
                }} />
                {/* Eye shine */}
                <div style={{
                  position: 'absolute',
                  top: '1px',
                  left: '1px',
                  width: '2px',
                  height: '2px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  opacity: showPassword ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }} />
              </div>
            </div>
            
            {/* Nose */}
            <div style={{
              position: 'absolute',
              bottom: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '3px',
              backgroundColor: '#654321',
              borderRadius: '50%'
            }} />
            
            {/* Mouth - shows when password is visible */}
            <div style={{
              position: 'absolute',
              bottom: '1px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '8px',
              height: '2px',
              backgroundColor: '#654321',
              borderRadius: '0 0 4px 4px',
              opacity: showPassword ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }} />
          </div>
        </div>
      </div>
      
      {/* Status indicator */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '50px',
        transform: 'translateY(-50%)',
        fontSize: '12px',
        color: '#6B7280',
        opacity: isTyping ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }}>
        {isTyping ? '👀' : ''}
      </div>
    </div>
  );
};

export default MonkeyPasswordInput; 