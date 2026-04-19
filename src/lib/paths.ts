const rawBase = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = rawBase.replace(/\/$/, "");

export function withBase(path: string): string {
  if (!basePath) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith(basePath + "/") || path === basePath) return path;
  if (!path.startsWith("/")) return `${basePath}/${path}`;
  return `${basePath}${path}`;
}

export const BASE_PATH = basePath;
