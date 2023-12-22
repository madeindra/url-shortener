export function generateSlug(length: number): string {
  // prepare characters to be used
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // prepare initial slug
  let slug = '';
  for (let i = 0; i < length; i += 1) {
    // append random character from characters set
    slug += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // return slug
  return slug;
}

export function validateUrl(url: string): boolean {
  // create url object
  const valid = new URL(url);

  // return true if valid
  return !!valid;
}
