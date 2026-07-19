export function formatarTempo(createdAt: string): string {
  const isoCompativel = createdAt.includes("T") ? createdAt : `${createdAt.replace(" ", "T")}Z`;
  const data = new Date(isoCompativel);

  if (Number.isNaN(data.getTime())) {
    return "recentemente";
  }

  const diffMs = Date.now() - data.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "agora mesmo";
  if (diffMin < 60) return `Há ${diffMin} min`;

  const diffHoras = Math.floor(diffMin / 60);
  if (diffHoras < 24) return `Há ${diffHoras}h`;

  const diffDias = Math.floor(diffHoras / 24);
  if (diffDias === 1) return "Há 1 dia";
  if (diffDias < 30) return `Há ${diffDias} dias`;

  const diffMeses = Math.floor(diffDias / 30);
  if (diffMeses === 1) return "Há 1 mês";
  return `Há ${diffMeses} meses`;
}
