import { getRoles, getSite } from "@/lib/cms";
import { Prose } from "@/components/ui/Prose";
import { RoleModal, type RoleFact } from "@/components/careers/RoleModal";

export const revalidate = 60;

export async function generateStaticParams() {
  const roles = await getRoles();
  return roles.filter((r) => r.slug).map((r) => ({ slug: r.slug as string }));
}

/** A role opened from the /careers list, shown in a dialog over it. */
export default async function RoleModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [roles, site] = await Promise.all([getRoles(), getSite()]);
  const role = roles.find((r) => r.slug === slug);
  if (!role) return null;

  const facts = [
    role.team && { kind: "team", label: "Team", value: role.team },
    role.type && { kind: "type", label: "Type", value: role.type },
    role.location && { kind: "location", label: "Location", value: role.location },
    role.experience && { kind: "experience", label: "Experience", value: role.experience },
    role.salary && { kind: "salary", label: "Compensation", value: role.salary },
  ].filter(Boolean) as RoleFact[];

  return (
    <RoleModal
      slug={slug}
      title={role.title}
      team={role.team}
      summary={role.summary}
      facts={facts}
      applyUrl={role.applyUrl}
      email={site.email}
      roles={roles.map((r) => ({ slug: r.slug, title: r.title }))}
      details={
        role.description ? (
          <Prose html={role.description} className="cm-prose-compact" />
        ) : (
          <p className="text-on-ink-2">{role.summary}</p>
        )
      }
    />
  );
}
