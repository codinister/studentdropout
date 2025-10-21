
/**
 * Hashes a password using SHA-256 (Edge-compatible)
 */
export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Use Web Crypto API
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}



export async function comparePassword(password: string, hashed: string) {
  const newHash = await hashPassword(password);
  return newHash === hashed;
}