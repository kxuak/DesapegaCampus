const NOME_STORAGE_KEY = "desapega-campus:nomeVendedor";

export function getNomeSalvo(): string {
  return localStorage.getItem(NOME_STORAGE_KEY) ?? "";
}

export function salvarNome(nome: string): void {
  if (!nome) return;
  localStorage.setItem(NOME_STORAGE_KEY, nome);
}
