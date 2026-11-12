import { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUtm } from '../lib/utm.js';

/**
 * One link component for the whole site.
 *  - "/route" or "/#hash" → client-side route, utm_* tags carried over
 *  - "#hash"              → same-page section (smooth-scrolled by App)
 *  - http(s)/mailto       → new tab; hub.bhumi.club/bca links get the visitor's utm_* tags
 */
const SmartLink = forwardRef(function SmartLink({ href, children, newTab, ...rest }, ref) {
  const { ext, int } = useUtm();
  const { pathname } = useLocation(); // the page this link is rendered on (stays put during route transitions)
  if (href.startsWith('/') || href.startsWith('#')) {
    const to = href.startsWith('#') ? int(pathname + href) : int(href);
    return (
      <Link ref={ref} to={to} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:/.test(href);
  const open = newTab ?? external;
  return (
    <a ref={ref} href={ext(href)} {...(open ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  );
});

export default SmartLink;
