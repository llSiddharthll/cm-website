/**
 * Renders one or more JSON-LD structured-data blocks. Server component, 
 * emits <script type="application/ld+json"> straight into the markup so
 * crawlers see it without executing JS.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Structured data is authored here, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
