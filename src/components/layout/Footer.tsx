import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
        <p className="mb-2 sm:mb-0">
          &copy; {currentYear} Magic Bank. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/help" className="hover:text-primary transition-colors">
            Help & Support
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;