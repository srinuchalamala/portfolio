export interface CloudinaryUploadResult {
  publicId: string;
  secureUrl: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  resourceType: string;
  originalFilename?: string;
}

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'do46xxegj';

export const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'portfolio';

/**
 * Upload a File directly to Cloudinary using the unsigned preset
 */
export async function uploadToCloudinary(
  file: File,
  folder = 'portfolio'
): Promise<CloudinaryUploadResult> {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  if (folder) {
    formData.append('folder', folder);
  }

  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `Cloudinary upload failed with status ${response.status}`
    );
  }

  const data = await response.json();

  return {
    publicId: data.public_id,
    secureUrl: data.secure_url,
    format: data.format,
    width: data.width,
    height: data.height,
    bytes: data.bytes,
    resourceType: data.resource_type,
    originalFilename: data.original_filename
  };
}

/**
 * Get an optimized Cloudinary transformation URL
 */
export function getOptimizedImageUrl(
  url: string,
  options?: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'png' | 'jpg';
    crop?: 'fill' | 'scale' | 'fit' | 'thumb';
  }
): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options || {};

  const transformations: string[] = [`f_${format}`, `q_${quality}`];

  if (width && height) {
    transformations.push(`c_${crop}`, `w_${width}`, `h_${height}`);
  } else if (width) {
    transformations.push(`w_${width}`);
  } else if (height) {
    transformations.push(`h_${height}`);
  }

  const transformString = transformations.join(',');

  // Insert transformation after /upload/
  return url.replace('/upload/', `/upload/${transformString}/`);
}
