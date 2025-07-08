import React from 'react';

const socialIcons = [
  { href: '#', label: 'Facebook', icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ) },
  { href: '#', label: 'Instagram', icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
  ) },
  { href: '#', label: 'YouTube', icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.48C19.13 4 12 4 12 4s-7.13 0-8.6.48A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.94C4.87 20 12 20 12 20s7.13 0 8.6-.48a2.78 2.78 0 0 0 1.94-1.94A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
  ) },
  { href: '#', label: 'Spotify', icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><path d="M9 9s1.5-1 3-1 3 1 3 1"/></svg>
  ) },
  { href: '#', label: 'Discord', icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.5 6.5A9.5 9.5 0 0 0 12 4.5a9.5 9.5 0 0 0-5.5 2A9.5 9.5 0 0 0 2 12a9.5 9.5 0 0 0 2 5.5A9.5 9.5 0 0 0 12 19.5a9.5 9.5 0 0 0 5.5-2A9.5 9.5 0 0 0 22 12a9.5 9.5 0 0 0-2-5.5z"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>
  ) },
  { href: '#', label: 'TikTok', icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17a4 4 0 1 1 0-8h1V7a5 5 0 0 1 5-5h2v2h-2a3 3 0 0 0-3 3v2h3l-1 4h-2v6a4 4 0 0 1-4 4z"/></svg>
  ) },
];

const companyLinks = [
  'Fondazione Prada',
  'Prada Group',
  'Luna Rossa',
  'Sustainability',
  'Work with us',
];

const legalLinks = [
  'Legal Notice',
  'Privacy Policy',
  'Cookie Policy',
  'Cookie setting',
  'Sitemap',
];

const Footer = () => (
  <footer className="w-full border-t border-gray-200 bg-white pt-8 pb-2 text-black" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
      {/* Social Icons */}
      <div className="flex gap-5 items-center justify-center md:justify-start mb-6 md:mb-0">
        {socialIcons.map((icon, i) => (
          <a key={i} href={icon.href} aria-label={icon.label} className="hover:text-gray-600 transition-colors duration-150">
            {icon.icon}
          </a>
        ))}
      </div>
      {/* Links */}
      <div className="flex flex-col sm:flex-row gap-12 w-full md:w-auto justify-center md:justify-start">
        <div>
          <div className="uppercase text-xs font-bold mb-3 tracking-wider">Company</div>
          <ul className="space-y-1">
            {companyLinks.map((link, i) => (
              <li key={i} className="text-sm hover:underline cursor-pointer">{link}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="uppercase text-xs font-bold mb-3 tracking-wider">Legal Terms and Conditions</div>
          <ul className="space-y-1">
            {legalLinks.map((link, i) => (
              <li key={i} className="text-sm hover:underline cursor-pointer">{link}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    {/* Bottom Bar */}
    <div className="mt-8 border-t border-gray-200 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-700 px-4 max-w-7xl mx-auto gap-2">
      <div className="mb-2 md:mb-0">@LOYAN 2007 - 2025 |</div>
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-1"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.36 6.36l-1.42-1.42M6.34 6.34L4.92 4.92m12.02 0l-1.42 1.42M6.34 17.66l-1.42 1.42"/></svg> STORE LOCATOR</span>
        <span className="flex items-center gap-1"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a10 10 0 0 1 0 20"/></svg> LOCATION: REST OF THE WORLD/ENGLISH</span>
      </div>
    </div>
  </footer>
);

export default Footer; 