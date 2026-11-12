// UTM pass-through (port of utm.php).
// Only the utm_* tags in the current URL are used — nothing is remembered between visits.
// They are appended to every hub.bhumi.club/bca/(apply|vote|summit) link and to links
// between BCA pages, so the tags survive moving around the site.
import { useLocation } from 'react-router-dom';

export function utmFromSearch(search) {
  const tags = {};
  new URLSearchParams(search).forEach((value, key) => {
    if (value !== '' && key.toLowerCase().startsWith('utm_')) tags[key] = value;
  });
  return tags;
}

export function withTags(href, tags) {
  if (!tags || !Object.keys(tags).length) return href;
  const [beforeHash, hash] = href.split('#');
  const [base, query = ''] = beforeHash.split('?');
  const params = new URLSearchParams(query);
  Object.entries(tags).forEach(([k, v]) => params.set(k, v));
  return `${base}?${params.toString()}${hash !== undefined ? `#${hash}` : ''}`;
}

const HUB = /^https:\/\/hub\.bhumi\.club\/bca\/(apply|vote|summit)\b/;

export function useUtm() {
  const { search } = useLocation();
  const tags = utmFromSearch(search);
  return {
    tags,
    /** External hub link with the visitor's tags; other external links untouched. */
    ext: (href) => (HUB.test(href) ? withTags(href, tags) : href),
    /** Internal route ("/summit", "/#faq") with the visitor's tags. */
    int: (to) => withTags(to, tags),
  };
}
