import { API_KEY, SEARCH_URL, VIDEOS_URL } from './constant.js';

async function fetchData(params, option) {
    // Construct the URL with query parameters
    let url = undefined;
    if (option === 'search') {
        url = new URL(SEARCH_URL);
    } else {
        url = new URL(VIDEOS_URL);
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
        maxResults: 50,
        type: 'video',
    };
    return fetchData(params, 'search');
}


export async function searchChannel(id) {
    const params = {
        key: API_KEY,
        part: 'snippet',
        channelId: id,
        channelType: 'channelTypeUnspecified',
        maxResults: 1,
    };
    return fetchData(params, 'search');
}


export async function searchVideo(videoId) {
    const params = {
        key: API_KEY,
        part: 'snippet',
        id: videoId,
    };
    return fetchData(params, 'search');
}