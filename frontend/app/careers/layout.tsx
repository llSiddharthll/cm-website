/** `modal` is filled by @modal/(.)[slug] when a role card is clicked on /careers. */
export default function CareersLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
