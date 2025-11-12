export const errorLines = (e) => {
  const data = e?.response?.data;

  // Si viene array -> bullets; si viene string -> línea única
  if (Array.isArray(data?.error?.message)) return data.error.message.filter(Boolean);
  if (Array.isArray(data?.message)) return data.message.filter(Boolean);
  if (Array.isArray(data?.errors)) return data.errors.map((x) => (typeof x === 'string' ? x : x?.message || JSON.stringify(x))).filter(Boolean);

  // String(): usa el mensaje más informativo y separa por líneas
  const msg = data?.error?.message || data?.message || data?.detail || e?.message || 'Ocurrió un error';
  return String(msg)
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean);
};
