export function getPathToLogo(logo?: string | null, favicon?: string | null): string | undefined {
  if (!logo) return undefined;

  if (logo === 'detect') return favicon || undefined;

  if (logo.startsWith('data:')) return logo;

  if (logo !== 'none') return `logo/${logo}.svg`;

  return undefined;
}
