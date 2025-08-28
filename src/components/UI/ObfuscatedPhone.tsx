import React, { useState } from 'react';

interface ObfuscatedPhoneProps {
  phone: string;
  className?: string;
}

/**
 * Phone obfuscation component that prevents bot scraping
 * while maintaining full user functionality
 */
export const ObfuscatedPhone: React.FC<ObfuscatedPhoneProps> = ({
  phone,
  className,
}) => {
  const [revealed, setRevealed] = useState(false);

  // Encode phone number as HTML entities
  const encodedPhone = phone
    .split('')
    .map((char) => {
      if (
        char === '-' ||
        char === ' ' ||
        char === '(' ||
        char === ')' ||
        char === '+'
      ) {
        return char; // Keep formatting characters
      }
      return `&#${char.charCodeAt(0)};`;
    })
    .join('');

  const handleClick = (e: React.MouseEvent) => {
    if (!revealed) {
      e.preventDefault();
      setRevealed(true);
      // Small delay then navigate
      setTimeout(() => {
        window.location.href = `tel:${phone}`;
      }, 100);
    }
  };

  const handleHover = () => {
    // Reveal on hover to show real number in status bar
    setRevealed(true);
  };

  if (revealed) {
    return (
      <a href={`tel:${phone}`} className={className}>
        {phone}
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
      data-phone="true"
      dangerouslySetInnerHTML={{
        __html: encodedPhone,
      }}
    />
  );
};
