"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useAdmin } from "@/components/admin/provider";
import { CollectionView } from "@/components/admin/CollectionView";

export default function CollectionPage() {
  const params = useParams<{ collection: string }>();
  const slug = String(params.collection);
  const { collections, collectionsBySlug } = useAdmin();
  const col = collectionsBySlug[slug];

  if (!col) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-zinc-500">
          {collections.length === 0
            ? "Loading collections…"
            : `“${slug}” isn’t a known collection.`}
        </p>
        {collections.length > 0 && (
          <Link href="/admin" className="text-sm font-medium text-orange hover:underline">
            Back to dashboard
          </Link>
        )}
      </div>
    );
  }

  return <CollectionView key={slug} collection={col} />;
}
