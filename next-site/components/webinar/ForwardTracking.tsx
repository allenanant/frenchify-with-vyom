import { TRACKING_KEYS } from '@/lib/webinar-tracking';

/**
 * Carries the ad's tracking parameters from the landing page onto the
 * registration links.
 *
 * Done on the client on purpose: the landing page takes the ad spike and stays
 * statically cached, which reading searchParams on the server would give up.
 *
 * It is a blocking inline script rather than a `useEffect`, and it renders
 * *after* the CTAs so the anchors exist by the time it runs. In a `useEffect`
 * the patch only lands once React has hydrated — on this page that is roughly
 * 190 KB of JavaScript away, and on a budget Android that window is seconds
 * long. A visitor who taps inside it navigates untagged and the conversion
 * goes unattributed, which is the one thing the whole query-string chain
 * exists to prevent.
 *
 * Cannot break the page: it is wrapped in try/catch, and if it never runs the
 * links still work, they just arrive untagged.
 */

const script = `
(function () {
  try {
    var allow = ${JSON.stringify(TRACKING_KEYS)};
    var here = new URLSearchParams(window.location.search);
    var out = new URLSearchParams();
    for (var i = 0; i < allow.length; i++) {
      var v = here.get(allow[i]);
      if (v && v.trim()) out.set(allow[i], v.trim().slice(0, 200));
    }
    var q = out.toString();
    if (!q) return;
    var links = document.querySelectorAll('a[href^="/webinar-form"]');
    for (var j = 0; j < links.length; j++) {
      var href = links[j].getAttribute('href') || '';
      if (href.indexOf('?') === -1) links[j].setAttribute('href', href + '?' + q);
    }
  } catch (e) {}
})();
`;

export default function ForwardTracking() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
