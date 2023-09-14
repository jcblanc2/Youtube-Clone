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


export async function searchVideos(keyword) {
    const params = {
        key: API_KEY,
        part: 'snippet',
        q: keyword,
        maxResults: 1,
        type: 'video',
    };
    return fetchData(params, 'search');
}


export async function searchChannel(channelId) {
    const params = {
        key: API_KEY,
        part: 'snippet',
        id: channelId,
    };

    const channels = await fetchData(params, 'channel');
    const photoProfile = channels[0].snippet.thumbnails.default.url;
    return photoProfile;
}


export async function searchVideo(videoId) {
    const params = {
        key: API_KEY,
        part: ['snippet', 'contentDetails', 'statistics'],
        id: videoId,
    };

    const video = await fetchData(params, 'video');
    const videoDetail = {
        duration: video[0].contentDetails.duration,
        viewCount: video[0].statistics.viewCount
    }
    return videoDetail;
}