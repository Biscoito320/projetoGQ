import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function generateUsername(name) {
  if (!name || typeof name !== 'string') {
    return `user${Math.floor(Math.random() * 10000)}`;
  }
  return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '') + Math.floor(Math.random() * 1000);
}