# SEO audit and plan: thecreativemonk.in

Audit date: 22 Oct 2026. Data: Semrush (India database) plus a crawl of all 253 sitemap URLs.

## Where the site stands

| Metric | Value |
|---|---|
| Organic keywords (India) | 42 |
| Organic visits / month | ~138, almost all from the brand name ("creative monk", #1) |
| Trend | ~224/mo in May 2026 → ~50 in Sep 2026; 600+ in 2022–23 |
| Authority Score | 8 (top Chandigarh competitors: 17 and 31) |
| Backlinks | 1.84M from 626 domains, ~1.73M of them spam (see below) |

Non-brand rankings are all on pages 3–6, so they bring almost no traffic yet:

| Keyword | Volume | Difficulty | Position | Page that should win |
|---|---|---|---|---|
| seo company in chandigarh | 1,300 | 37 | 34 | /seo-in-chandigarh |
| best seo company in chandigarh | 720 | 16 | 33 | /seo-in-chandigarh |
| seo services in chandigarh | 590 | 22 | 51 | /seo-in-chandigarh |
| digital marketing company in zirakpur | 390 | 9 | 44 | /digital-marketing-in-zirakpur |
| seo services in panchkula | 320 | 7 | 58 | /seo-in-panchkula |
| social media marketing agency in chandigarh | 140 | – | 28 | /social-media-marketing-in-chandigarh |

Google still credits several of these to old URLs (/services/market/seo, /services/creatives). They redirect correctly; recrawling will move the credit across.

## Keyword targets (Semrush India, monthly searches)

| Keyword | Volume | KD | Target page |
|---|---|---|---|
| digital marketing agency in chandigarh | 2,400 | 16 | /digital-marketing-in-chandigarh (H1) |
| digital marketing company in chandigarh | 2,400 | 37 | /digital-marketing-in-chandigarh (title), homepage |
| digital marketing agency for ecommerce | 1,900 | 12 | /digital-marketing-for-d2c-ecommerce |
| seo company in chandigarh | 1,300 | 37 | /seo-in-chandigarh |
| seo company in mohali | 1,000 | 14 | /seo-in-mohali |
| digital marketing company in mohali | 880 | 23 | /digital-marketing-in-mohali |
| website designing company in chandigarh | 880 | 14 | /web-development-in-chandigarh |
| web design company in chandigarh | 880 | 31 | /web-development-in-chandigarh |
| real estate marketing agency | 720 | 11 | /industries/real-estate |
| digital marketing agency for real estate | 720 | 21 | /digital-marketing-for-real-estate |
| healthcare digital marketing agency | 720 | 26 | /digital-marketing-for-healthcare |
| marketing agency in chandigarh | 480 | 33 | /locations/chandigarh |
| digital marketing jobs in chandigarh | 480 | 21 | /careers |
| ecommerce marketing agency | 480 | 10 | /industries/d2c-ecommerce |
| advertising agency in chandigarh | 390 | 16 | /locations/chandigarh |
| digital marketing company in zirakpur / panchkula | 390 each | 9–10 | city pages |
| ppc company in chandigarh | 210 | 14 | /google-ads-in-chandigarh |
| seo company in india | 9,900 | 32 | /services/get-found/seo |
| digital marketing agency near me | 12,100 | 33 | **Google Business Profile** (map pack), not a web page |

## Fixed in code (this release)

- **23 case-study pages canonicalised to the homepage.** The root layout set `canonical: "/"` as a default, and pages without their own metadata inherited it, telling Google every case study was a duplicate of the homepage. Default removed; every case study now canonicalises to itself, with a proper title, description, share image, CreativeWork and breadcrumb schema.
- **Homepage had no keyword anywhere.** Title "Creative Monk, Growth, with intention." → "Digital Marketing Agency in Chandigarh | Creative Monk"; the H1 is now "Digital marketing agency in Chandigarh · since 2017" (editable in admin as *SEO heading*), the brand line unchanged visually. Added studio LocalBusiness (ProfessionalService) schema on the homepage and contact page.
- **City/industry pages:** titles use the higher-volume phrasing and H1s the other ("Digital Marketing Company in Chandigarh" / "Digital Marketing Agency in Chandigarh"; "PPC Company … | Google Ads Agency"; "Website Designing & Development Company …"; "Branding & Logo Design Agency …"), dedicated meta descriptions ending in a call to action, a keyword H2, real localities served per city, and a local "meet in person" FAQ.
- **Core pages** (About, Work, Portfolio, Blog, Contact, Careers, Industries, Locations) had one-word titles; now keyword titles and descriptions. Town hubs renamed from "Creative Agency" (~20 searches) to "Advertising & Marketing Agency" (870 combined in Chandigarh).
- **30 pages** fell back to the generic site description (29 blog posts, homepage): blog posts now use their opening paragraph.
- **Alt text** added to in-article blog images and content thumbnails (119 → 2 pages; the 2 are decorative by design).
- **Titles past ~60 characters** drop the " · Creative Monk" suffix instead of being cut mid-keyword; trailing full stops trimmed.
- **Sitemap** built from the live CMS (was static fallbacks), now includes the 7 job pages and lastmod dates.
- Two blog posts shared one title; each now matches its URL.

## Do next, outside the code (highest impact first)

1. **Google Business Profile.** "digital marketing agency near me" (12,100/mo) and the map pack you already appear in for 27 keywords are won here, not on the site. Category "Internet marketing service" plus secondary "Website designer", "Advertising agency", "Marketing agency"; services listed individually; photos of the studio and team; weekly posts; a steady flow of real client reviews with replies.
2. **Search Console:** submit `https://thecreativemonk.in/sitemap.xml`, then *URL Inspection → Request indexing* for the homepage, /digital-marketing-in-chandigarh, /seo-in-chandigarh, /seo-in-mohali, /web-development-in-chandigarh, /digital-marketing-for-d2c-ecommerce and /industries/real-estate.
3. **Disavow spam links.** Upload `disavow.txt` (in this folder) at https://search.google.com/search-console/disavow-links. It lists 67 domains (adult, gambling, junk) carrying ~1.73M of the 1.84M backlinks. Two Indian domains are listed as comments for you to check first: they may be client sites with a "designed by" credit, which is fine to keep.
4. **Get onto the lists Google ranks.** Page one for these keywords is mostly "top 10 agencies in Chandigarh" articles (thinknext.co.in, rednirus.in, theadroit.in, seodiscovery.com) and directories (Justdial, agencies.semrush.com). Ask for inclusion, and complete profiles on Clutch, GoodFirms and DesignRush (you already have DesignRush and GoodFirms links; keep those profiles current).
5. **Earn local links.** Client case studies published with the client linking back, Tricity business associations, local press, and guest pieces on Indian marketing publications.
6. **Content that targets demand you can win:** "digital marketing company in mohali" style pages already exist; next, blog guides around buyer questions ("how much does SEO cost in India", "Google Ads vs Meta Ads for real estate"), each linking to the matching service page.
7. **Thin pages:** case studies average ~234 words. Adding the brief, approach, numbers and a client quote to each would let them rank for "<industry> marketing case study" searches.
8. **Reviewer avatars** on the homepage are stock photos next to real reviewers' names. Replace them with initials or real photos; it's a trust issue for visitors, not just SEO.

## Not recommended

- Adding more city pages (Ludhiana, Jalandhar, Dehradun) from the same template before the Tricity pages rank. Near-identical pages for places you don't operate in are what Google's doorway-page policy targets. Revisit with genuinely local content once the current pages climb.
