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


function formatNumberWithUnit(number, unit) {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(1) + ' B ' + unit;
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + ' M ' + unit;
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + ' K ' + unit;
  } else {
    return number.toString() + ' ' + unit;
  }
}

export function formatViews(views) {
  return formatNumberWithUnit(views, 'views');
}

export function formatLikes(likes) {
  return formatNumberWithUnit(likes, '');
}

export function formatsubscriberCount(subscriberCount) {
  const unit = subscriberCount === 1 ? 'subscriber' : 'subscribers';
  return formatNumberWithUnit(subscriberCount, unit);
}


export function convertDurationToTimeString(duration) {
  const isoDurationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(\d+)S/;
  const matches = duration.match(isoDurationRegex);

  if (matches) {
    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;
    const seconds = parseInt(matches[3]);

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return null;
}


export function fotmatTags(tags) {
  let allTags = '';
  if (tags.length > 0) {
    tags.forEach((tag) => {
      allTags += `#${tag.replace(/\s+/g, '')} `;
    });
  }
  return allTags;
}


export function truncateDescription(description) {
  const maxLength = 320;
  if (description.length <= maxLength) {
    return description;
  }

  return description.substring(0, maxLength - 3) + '...';
}