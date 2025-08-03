export default function FormatTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 60) {
    return `hace ${diffMins <= 1 ? '1 minuto' : `${diffMins} min`}`;
  }

  if (diffHours < 24) {
    return `hace ${diffHours === 0 ? 'menos de 1' : diffHours} h`;
  } 

  if (diffDays >= 30 && diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `hace ${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`;
  }
  
  if (diffDays >= 365) {
    const diffYears = Math.floor(diffDays / 365);
    return `hace ${diffYears} ${diffYears === 1 ? 'año' : 'años'}`;
  }

  return `hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
}