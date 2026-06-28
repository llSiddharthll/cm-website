/* Mirrors the backend schema registry (GET /api/schema). */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "slug"
  | "url"
  | "date"
  | "select"
  | "multiselect"
  | "tags"
  | "paragraphs"
  | "richtext"
  | "image"
  | "video"
  | "color"
  | "object"
  | "objectList";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: string[];
  fields?: Field[];
  listColumn?: boolean;
  filterable?: boolean;
  default?: unknown;
};

export type Collection = {
  slug: string;
  name: string;
  pluralName: string;
  kind: "collection" | "singleton";
  group: string;
  icon: string;
  description?: string;
  titleField?: string;
  subtitleField?: string;
  slugField?: string;
  fields: Field[];
  public?: boolean;
  intakeOnly?: boolean;
  defaultSort?: "position" | "created_desc" | "created_asc";
};

export type Meta = {
  _id: string;
  _slug: string | null;
  _position: number;
  _status: string;
  _createdAt: string;
  _updatedAt: string;
};

export type Entry = Meta & Record<string, unknown>;

export type MediaAsset = {
  id: string;
  public_id: string;
  url: string;
  resource_type: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  original_filename?: string;
  created_at?: string;
};

export type Overview = {
  collections: {
    slug: string;
    name: string;
    pluralName: string;
    group: string;
    icon: string;
    kind: string;
    count: number;
  }[];
  totals: {
    leads: number;
    newLeads: number;
    subscribers: number;
    media: number;
    contentEntries: number;
  };
  recentLeads: Entry[];
};

export type AdminUser = { id: string; email: string; name: string | null };
