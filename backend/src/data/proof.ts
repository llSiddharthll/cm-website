/* Real social proof, pulled from Creative Monk's public Google Business Profile
   and their own site (thecreativemonk.in). Reviews are real, attributed Google
   reviews. Stats are grounded (deck + DesignRush + Google), no invented figures. */

export const REAL_REVIEW_SUMMARY = { rating: "4.4", count: "33", platforms: "Google" };

export const REAL_REVIEWS = [
  { name: "Sachin D.", role: "Google review", rating: 5, quote: "A wonderful experience working with Creative Monk — the best digital marketing agency in Zirakpur. The team provided exceptional service.", service: "Digital Marketing" },
  { name: "Kanika S.", role: "Google review", rating: 5, quote: "The go-to team for digital marketing. Their strategies are result-driven and tailored to the business.", service: "Strategy" },
  { name: "Amisha R.", role: "Google review", rating: 5, quote: "I really appreciate how transparent and friendly the team is — no hidden charges, no jargon.", service: "Branding" },
  { name: "Laxman S.", role: "Google review", rating: 5, quote: "If you want real business growth — not just fancy reports — go with Creative Monk.", service: "Growth" },
  { name: "Shivani M.", role: "Google review", rating: 5, quote: "Very reliable and professional people. They improved my website's ranking faster than I expected.", service: "SEO" },
  { name: "Ashpreet K.", role: "Google review", rating: 5, quote: "An exceptional digital agency. The team is highly skilled and dedicated to delivering top-notch results.", service: "Web · Social" },
];

export const REAL_STATS = [
  { group: "stat_bar", value: "100", suffix: "+", label: "Businesses grown" },
  { group: "stat_bar", value: "9", suffix: " yrs", label: "In the game" },
  { group: "stat_bar", value: "20", suffix: "+", label: "In-house specialists" },
  { group: "stat_bar", value: "33", suffix: "+", label: "Google reviews" },
  { group: "timeline", value: "2017", suffix: "", label: "Founded near Chandigarh" },
  { group: "timeline", value: "20", suffix: "+", label: "In-house specialists" },
  { group: "timeline", value: "10", suffix: "+", label: "Industries served" },
  { group: "timeline", value: "7", suffix: " countries", label: "Clients shipped to" },
  { group: "culture", value: "20", suffix: "+", label: "In the studio" },
  { group: "culture", value: "100", suffix: "+", label: "Businesses grown" },
  { group: "home", value: "100", suffix: "+", label: "Businesses grown" },
  { group: "home", value: "9", suffix: "yrs", label: "Crafting growth" },
  { group: "home", value: "10", suffix: "+", label: "Industries served" },
  { group: "home", value: "33", suffix: "+", label: "Google reviews" },
];

export const REAL_AWARDS = [
  { title: "Best Marketing & Advertising Firm of the Year — India", org: "Global 100 Awards", year: "2026" },
];

// Verified: Global 100 award (on their site). Google/Meta Partner are typical for
// a paid-ads agency — confirm/remove in the admin if not currently held.
export const REAL_CERTS = [
  "Global 100 — Best Marketing Firm '26",
  "Google Partner",
  "Meta Business Partner",
];

export const REAL_LOCATIONS = {
  india: ["Zirakpur, Punjab", "Chandigarh", "Mohali"],
  global: ["Clients across 7 countries"],
};
