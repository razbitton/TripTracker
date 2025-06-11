export function createPageUrl(page: string): string {
  return `/${page.toLowerCase()}`;
}

export function formatCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `₪${num.toFixed(2)}`;
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `לפני ${minutes} דקות`;
  } else if (hours < 24) {
    return `לפני ${hours} שעות`;
  } else if (days === 1) {
    return 'אתמול';
  } else {
    return `לפני ${days} ימים`;
  }
}
