/**
 * 410 Gone for spam URLs injected while the old WordPress site was compromised
 * (Apr 2026: comment.php?item/…, content.php?item/…, /item/…). A 404 reads as
 * "maybe temporarily missing" and Google keeps retrying; 410 says they are
 * deleted for good, so they drop out of the index faster.
 */
export function gone() {
  return new Response("410 Gone", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
