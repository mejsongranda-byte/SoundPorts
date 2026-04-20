export function generateId() {
  return crypto.randomUUID();
}

export function formatDate() {
  return new Date().toLocaleDateString();
}