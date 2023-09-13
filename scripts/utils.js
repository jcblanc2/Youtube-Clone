// Helper function to format the date
export function formatDate(publishedAt) {
  const videoDate = new Date(publishedAt);
  const currentDate = new Date();
  const monthsAgo = Math.floor((currentDate - videoDate) / (30 * 24 * 60 * 60 * 1000));
  if (monthsAgo < 12) {
    return `${monthsAgo} months ago`;
  } else {
    const yearsAgo = Math.floor(monthsAgo / 12);
    return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
  }
}