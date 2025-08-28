import React, { useState } from 'react';

interface ObfuscatedEmailProps {
  email: string;
  className?: string;
}

/**
 * Email obfuscation component that prevents bot scraping
 * while maintaining full user functionality
 */
export const ObfuscatedEmail: React.FC<ObfuscatedEmailProps> = ({
  email,
  className,
}) => {
  const [revealed, setRevealed] = useState(false);

  // Split email into parts for obfuscation
  const [localPart, domainPart] = email.split('@');
  const [domainName, tld] = domainPart ? domainPart.split('.') : ['', ''];

  // Encode parts as HTML entities
  const encodedLocal = localPart
    .split('')
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join('');

  const encodedDomain = domainName
    .split('')
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join('');

  const handleClick = (e: React.MouseEvent) => {
    // Only reveal and navigate on actual user click
    if (!revealed) {
      e.preventDefault();
      setRevealed(true);
      // Small delay then navigate
      setTimeout(() => {
        window.location.href = `mailto:${email}`;
      }, 100);
    }
  };

  const handleHover = () => {
    // Reveal on hover to show real email in status bar
    setRevealed(true);
  };

  if (revealed) {
    return (
      <a href={`mailto:${email}`} className={className}>
        {email}
      </a>
    );
  }

  // Render obfuscated version
  return (
    <a
      href="#"
      onClick={handleClick}
      onMouseEnter={handleHover}
      className={className}
      data-email="true"
      dangerouslySetInnerHTML={{
        __html: `${encodedLocal}<span>&#64;</span>${encodedDomain}<span>&#46;</span>${tld}`,
      }}
    />
  );
};
