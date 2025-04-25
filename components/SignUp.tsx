import React, { useState, useEffect } from 'react';

interface SignUpProps {
  onSignUp: (username: string, password: string, email: string) => void;
  onSwitchToLogin: () => void;
}

interface PasswordRequirements {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  hasNoSpaces: boolean;
  hasNoUsername: boolean;
  hasNoCommonWords: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirements>({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasNoSpaces: false,
    hasNoUsername: false,
    hasNoCommonWords: false,
  });

  const commonWords = ['password', '123456', 'qwerty', 'admin', 'welcome'];

  useEffect(() => {
    // Check password requirements whenever password changes
    const requirements = {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNoSpaces: !/\s/.test(password),
      hasNoUsername: !password.toLowerCase().includes(username.toLowerCase()),
      hasNoCommonWords: !commonWords.some(word => password.toLowerCase().includes(word)),
    };
    setPasswordRequirements(requirements);

    // Calculate password strength
    let strength = 0;
    if (requirements.hasMinLength) strength += 1;
    if (requirements.hasUpperCase) strength += 1;
    if (requirements.hasLowerCase) strength += 1;
    if (requirements.hasNumber) strength += 1;
    if (requirements.hasSpecialChar) strength += 1;
    if (requirements.hasNoSpaces) strength += 1;
    if (requirements.hasNoUsername) strength += 1;
    if (requirements.hasNoCommonWords) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;

    setPasswordStrength(strength);
  }, [password, username]);

  const getStrengthColor = () => {
    if (passwordStrength <= 3) return '#ff4c4c'; // Weak
    if (passwordStrength <= 6) return '#ffb84c'; // Medium
    if (passwordStrength <= 8) return '#00b8ff'; // Strong
    return '#00ff9d'; // Very Strong
  };

  const getStrengthText = () => {
    if (passwordStrength <= 3) return 'Weak';
    if (passwordStrength <= 6) return 'Medium';
    if (passwordStrength <= 8) return 'Strong';
    return 'Very Strong';
  };

  const isPasswordStrong = () => {
    return passwordStrength >= 6; // Require at least medium strength
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (!isPasswordStrong()) {
        throw new Error('Please create a stronger password');
      }
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      await onSignUp(username, password, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Create Account</h2>
          <p>Join our AI Safety Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className={password && !isPasswordStrong() ? 'error' : ''}
            />
            {password && (
              <div className="password-strength-meter">
                <div 
                  className="strength-bar"
                  style={{
                    width: `${(passwordStrength / 10) * 100}%`,
                    backgroundColor: getStrengthColor()
                  }}
                />
                <span className="strength-text" style={{ color: getStrengthColor() }}>
                  {getStrengthText()}
                </span>
              </div>
            )}
            {password && (
              <div className="password-requirements">
                <p>Password must contain:</p>
                <ul>
                  <li className={passwordRequirements.hasMinLength ? 'valid' : 'invalid'}>
                    At least 8 characters
                  </li>
                  <li className={passwordRequirements.hasUpperCase ? 'valid' : 'invalid'}>
                    At least one uppercase letter
                  </li>
                  <li className={passwordRequirements.hasLowerCase ? 'valid' : 'invalid'}>
                    At least one lowercase letter
                  </li>
                  <li className={passwordRequirements.hasNumber ? 'valid' : 'invalid'}>
                    At least one number
                  </li>
                  <li className={passwordRequirements.hasSpecialChar ? 'valid' : 'invalid'}>
                    At least one special character
                  </li>
                  <li className={passwordRequirements.hasNoSpaces ? 'valid' : 'invalid'}>
                    No spaces
                  </li>
                  <li className={passwordRequirements.hasNoUsername ? 'valid' : 'invalid'}>
                    Not contain username
                  </li>
                  <li className={passwordRequirements.hasNoCommonWords ? 'valid' : 'invalid'}>
                    Not contain common words
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className={confirmPassword && password !== confirmPassword ? 'error' : ''}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button" 
            disabled={isLoading || !isPasswordStrong()}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <button onClick={onSwitchToLogin} className="switch-form-button">Sign In</button></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 