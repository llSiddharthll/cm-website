import { v2 as cloudinary } from "cloudinary";
import { env, cloudinaryEnabled } from "../env";

if (cloudinaryEnabled) {
  cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
    secure: true,
  });
}

export type UploadResult = {
  public_id: string;
  url: string;
  resource_type: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  original_filename?: string;
};

export async function uploadBuffer(
  buffer: Buffer,
  filename: string,
): Promise<UploadResult> {
  if (!cloudinaryEnabled) {
    throw new Error("Cloudinary is not configured");
  }
  return new Promise<UploadResult>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: env.cloudinary.folder, resource_type: "auto" },
      (error, result) => {
        if (error || !result) return reject(error || new Error("Upload failed"));
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
          resource_type: result.resource_type,
          format: result.format,
          bytes: result.bytes,
          width: result.width,
          height: result.height,
          original_filename: filename,
        });
      },
    );
    stream.end(buffer);
  });
}

export async function destroyAsset(
  publicId: string,
  resourceType = "image",
): Promise<void> {
  if (!cloudinaryEnabled) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export { cloudinaryEnabled };
