import { searchVideos, searchChannel, searchVideo } from './search.js';
import {
    formatDate, formatViews,
    convertDurationToTimeString,
    formatLikes, fotmatTags, truncateDescription
} from './utils.js';

let videoGridHtml = '';
let videoDetailsHtml = '';

const videoGrid = document.querySelector('.video-grid');
const videoDetails = document.querySelector('.video-details');

// fillVideoGrid();

async function fillVideoGrid() {
    searchVideos("paysage suisse")
        .then(async (videos) => {
            for (const video of videos) {
                const channelPhotoProfile = await searchChannel(video.snippet.channelId);
                const { duration, viewCount } = await searchVideo(video.id.videoId);

                videoGridHtml +=
                    `
                <div class="video-preview" data-video-id=${video.id.videoId}>
                    <div class="thumbnail-row">
                        <img class="thumbnail" src="${video.snippet.thumbnails.medium.url}" alt="" />
                        <div class="video-time">${convertDurationToTimeString(duration)}</div>
                    </div>
                    <div class="video-info-grid">
                        <div class="thumbnail-profile">
                        <img class="profile" src="${channelPhotoProfile}" alt="" /> <!-- Use the awaited result here -->
                        </div>
                        <div class="video-info">
                        <div class="video-title-container">
                            <p class="video-title">
                            ${video.snippet.title}
                            </p>
                            <p class="tree-dots">&#8942;</p>
                        </div>
                        <p class="video-author">${video.snippet.channelTitle}</p>
                        <p class="video-stats">${formatViews(viewCount)} · ${formatDate(video.snippet.publishedAt)}</p>
                        </div>
                    </div>
                </div>
            `;
            }

            videoGrid.innerHTML = videoGridHtml;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


videoGrid.addEventListener('click', (event) => {
    const videoPreview = event.target.closest('.video-preview');
    if (videoPreview) {
        fillVideoDetails(videoPreview.dataset.videoId);
    }
});



async function fillVideoDetails(videoId) {
    const video = await searchVideo(videoId);
    const channelPhotoProfile = await searchChannel(video.channelId);

    videoDetailsHtml =
        `
    <div class="video-details-container">
          <div class="video-container">
            <iframe
              class="video-player"
              src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1"
            >
            </iframe>
          </div>
          <div class="video-description">
            <p class="video-detail-title">
              ${video.title}
            </p>
            <div class="container-channel-info">
              <div class="profile-image-container">
                <img class="profile-image" src="${channelPhotoProfile}" alt="" />
              </div>
              <div class="channel-info">
                <div class="info-left-section">
                  <div>
                    <p class="channel-name">${video.channelTitle}</p>
                    <p class="channel-stats">4,78 M d’abonnés</p>
                  </div>

                  <div class="subscribe-btn-section">
                    <button class="subscribe-btn">Subscribe</button>
                  </div>
                </div>

                <div class="info-right-section">
                  <button class="like-btn">${formatLikes(video.likeCount)}</button>
                  <button class="dislike-btn">Dislike</button>
                  <button class="share-btn">Share</button>
                  <button class="more-btn">&#8230;</button>
                </div>
              </div>
            </div>
            <div class="bottom-description-container">
              <p class="bottom-detail-stats">
              ${formatViews(video.viewCount)} · ${formatDate(video.publishedAt)} ${fotmatTags(video.tags)}
              </p>
              <p class="bottom-more-description">
                ${truncateDescription(video.description)}
              </p>
            </div>
          </div>
        </div>
    `;

    videoGrid.innerHTML = '';
    videoDetails.innerHTML = videoDetailsHtml;
}
