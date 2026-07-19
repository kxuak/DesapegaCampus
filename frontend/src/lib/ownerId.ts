const STORAGE_KEY = "desapega-campus:ownerId";

export function getOwnerId(): string {
  let ownerId = localStorage.getItem(STORAGE_KEY);

  if (!ownerId) {
    ownerId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, ownerId);
  }

  return ownerId;
}
