import { API_KEY, SEARCH_URL, VIDEOS_URL, CHANNELS_URL } from './constant.js';

async function fetchData(params, option) {
    let url = undefined;
    if (option === 'search') {
        url = new URL(SEARCH_URL);
    } else if (option === 'video') {
        url = new URL(VIDEOS_URL);
    } else if (option === 'channel') {
        url = new URL(CHANNELS_URL);
    }

    url.search = new URLSearchParams(params).toString();

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error('Error: Network response was not ok');
            return [];
        }

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function searchVideos(keyword, maxResults) {
    const params = {
        key: API_KEY,
        part: 'snippet',
        q: keyword,
        maxResults: maxResults,
        type: 'video',
    };
    return fetchData(params, 'search');
}




export async function searchChannel(channelId) {
    const params = {
        key: API_KEY,
        part: ['snippet', 'statistics'],
        id: channelId,
    };

    const channel = await fetchData(params, 'channel');
    const channelDetail = {
        photoProfile: channel[0].snippet.thumbnails.default.url,
        subscriberCount: channel[0].statistics.subscriberCount

    }
    return channelDetail;
}


export async function searchVideo(videoId) {
    const params = {
        key: API_KEY,
        part: ['snippet', 'contentDetails', 'statistics'],
        id: videoId,
    };

    const video = await fetchData(params, 'video');

    const videoDetail = {
        title: video[0].snippet.title,
        channelId: video[0].snippet.channelId,
        channelTitle: video[0].snippet.channelTitle,
        duration: video[0].contentDetails.duration,
        publishedAt: video[0].snippet.publishedAt,
        viewCount: video[0].statistics.viewCount,
        likeCount: video[0].statistics.likeCount,
        tags: video[0].snippet.tags ? video[0].snippet.tags.slice(0, 3) : [],
        description: video[0].snippet.localized.description
    }
    return videoDetail;
}