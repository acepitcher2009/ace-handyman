export interface NavItem {
  label: string;
  path: string;
  isCta?: boolean;
}

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Service Areas', path: '/service-areas' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Maintenance Program', path: '/maintenance-program' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'About', path: '/about' },
  { label: 'Get an Estimate', path: '/contact', isCta: true },
];
