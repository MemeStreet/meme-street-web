import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  target,
  disabled = false,
  type = 'button',
}) => {
  const baseStyles = 'font-medium rounded-full transition-all duration-300 inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary-600 to-accent-500 text-white hover:shadow-lg',
    secondary: 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-dark-600',
    outline: 'border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-dark-700',
    text: 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-dark-700',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;
  
  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={buttonClasses}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;