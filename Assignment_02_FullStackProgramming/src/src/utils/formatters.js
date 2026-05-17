const pkrFormatter = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0
});

export const formatPKR = (amount) => pkrFormatter.format(amount || 0);
