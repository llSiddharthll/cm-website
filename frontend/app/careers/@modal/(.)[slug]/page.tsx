import { ArrowUpRight, Briefcase, Clock, MapPin, Wallet } from "lucide-react";
import { getRoles } from "@/lib/cms";
import { Prose } from "@/components/ui/Prose";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { RoleModal, ScrollToButton } from "@/components/careers/RoleModal";

export const revalidate = 60;

export async function generateStaticParams() {
  const roles = await getRoles();
  return roles.filter((r) => r.slug).map((r) => ({ slug: r.slug as string }));
}

/** A role opened from the /careers list, shown in a modal over it. */
export default async function RoleModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const roles = await getRoles();
  const role = roles.find((r) => r.slug === slug);
  if (!role) return null;

  const roleOptions = roles.map((r) => ({ slug: r.slug, title: r.title }));
  const meta = [
    role.type && { icon: Briefcase, value: role.type },
    role.location && { icon: MapPin, value: role.location },
    role.experience && { icon: Clock, value: role.experience },
    role.salary && { icon: Wallet, value: role.salary },
  ].filter(Boolean) as { icon: typeof Briefcase; value: string }[];

  const ctaCls =
    "group label inline-flex h-11 cursor-pointer items-center gap-2 bg-orange px-5 text-on-orange transition-colors hover:bg-orange-press";

  return (
    <RoleModal title={role.title} fullHref={`/careers/${slug}`}>
      {role.team && <span className="mono block text-orange">{role.team}</span>}
      <h2 className="display-tight mt-2 text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] leading-[1] text-on-ink">
        {role.title}
        <span className="text-orange">.</span>
      </h2>
      {role.summary && (
        <p className="mt-4 max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">{role.summary}</p>
      )}
      {meta.length > 0 && (
        <div className="mono mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-on-ink-3">
          {meta.map((m) => (
            <span key={m.value} className="inline-flex items-center gap-2">
              <m.icon className="size-4 text-orange" />
              {m.value}
            </span>
          ))}
        </div>
      )}

      <div className="mt-7">
        {role.applyUrl ? (
          <a href={role.applyUrl} target="_blank" rel="noopener noreferrer" className={ctaCls}>
            Apply for this role
            <ArrowUpRight className="size-4" />
          </a>
        ) : (
          <ScrollToButton targetId="role-apply" className={ctaCls}>
            Apply for this role
          </ScrollToButton>
        )}
      </div>

      <div className="mt-9 border-t border-line-invert pt-8">
        {role.description ? (
          <Prose html={role.description} />
        ) : (
          <p className="text-on-ink-2">{role.summary}</p>
        )}
      </div>

      {!role.applyUrl && (
        <section id="role-apply" className="mt-12 scroll-mt-4 border-t border-line-invert pt-8">
          <span className="label text-on-ink-3">Apply</span>
          <h3 className="display mt-3 text-[length:var(--text-h3)] text-on-ink">Apply for {role.title}</h3>
          <div className="mt-7">
            <ApplicationForm roles={roleOptions} defaultRole={slug} />
          </div>
        </section>
      )}
    </RoleModal>
  );
}
