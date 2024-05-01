import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 dark:bg-stone-950 text-white text-lg font-extralight dark:text-white py-12 border-t dark:border-stone-900">
      <div className="container mx-auto flex flex-wrap items-center justify-around">
        {/* Navigation Section */}
        <div className="mb-8">
          <h3 className="text-xl font-extralight mb-4">Quick Links</h3>
          <ul className="list-none">
            <FooterLink href="/" text="Home" />
            <FooterLink href="/about" text="About" />
            <FooterLink href="/all-products" text="Products" />
            <FooterLink href="/contact" text="Contact" />
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-xl font-extralight mb-4">Other Links</h3>
          <ul className="list-none">
            <FooterLink href="#" text="Login" />
            <FooterLink href="#" text="Apps" />
            <FooterLink href="#" text="Marketing" />
            <FooterLink href="#" text="Business" />
          </ul>
        </div>
      </div>

      {/* Copyright Information */}
      <div className="text-center mt-8">
        <p className="text-sm">
          &copy; 2024 Your Website. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  text: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, text }) => (
  <li className="mb-2">
    <a href={href} className="hover:text-blue-300">
      {text}
    </a>
  </li>
);
