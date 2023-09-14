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


export function formatViews(views) {
  if (views >= 1e9) {
    return (views / 1e9).toFixed(1) + ' B views';
  } else if (views >= 1e6) {
    return (views / 1e6).toFixed(1) + ' M views';
  } else if (views >= 1e3) {
    return (views / 1e3).toFixed(1) + ' K views';
  } else {
    return views.toString() + ' views';
  }
}


export function formatLikes(likes) {
  if (likes >= 1e9) {
    return (likes / 1e9).toFixed(1) + ' B';
  } else if (likes >= 1e6) {
    return (likes / 1e6).toFixed(1) + ' M';
  } else if (likes >= 1e3) {
    return (likes / 1e3).toFixed(1) + ' K';
  } else {
    return likes.toString();
  }
}


export function convertDurationToTimeString(duration) {
  const matches = duration.match(/(\d+)H(\d+)M(\d+)S/);
  if (matches) {
    const hours = parseInt(matches[1]);
    const minutes = parseInt(matches[2]);
    const seconds = parseInt(matches[3]);
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return null;
}


export function fotmatTags(tags) {
  let allTags = '';
  tags.forEach((tag) => {
    allTags += `#${tag.replace(/\s+/g, '')} `;
  });
  return allTags;
}


export function truncateDescription(description) {
  const maxLength = 320;
  if (description.length <= maxLength) {
    return description;
  }

  return description.substring(0, maxLength - 3) + '...';
}