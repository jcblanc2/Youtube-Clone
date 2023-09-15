import { searchVideos, searchChannel, searchVideo } from './search.js';
import {
  formatDate, formatViews,
  convertDurationToTimeString,
  formatLikes, fotmatTags,
  truncateDescription, formatsubscriberCount
} from './utils.js';

let videoGridHtml = '';
let videoDetailsHtml = '';
let sidebarVideoHtml = '';

const videoGrid = document.querySelector('.video-grid');
const videoDetails = document.querySelector('.video-details');
const sidebarVideo = document.querySelector('.sidebar-video');

fillVideoGrid();

async function fillVideoGrid() {
  searchVideos("paysage suisse", 20)
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
                            <img class="profile" src="${channelPhotoProfile}" alt="" /> 
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



sidebarVideo.addEventListener('click', (event) => {
  const videoPreview = event.target.closest('.side-video-preview');
  if (videoPreview) {
    fillVideoDetails(videoPreview.dataset.videoId);
  }
});




async function fillVideoDetails(videoId) {
  const video = await searchVideo(videoId);
  const channel = await searchChannel(video.channelId);

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
                <img class="profile-image" src="${channel.photoProfile}" alt="" />
              </div>
              <div class="channel-info">
                <div class="info-left-section">
                  <div>
                    <p class="channel-name">${video.channelTitle}</p>
                    <p class="channel-stats">${formatsubscriberCount(channel.subscriberCount)}</p>
                  </div>

                  <div class="subscribe-btn-section">
                    <button class="subscribe-btn">Subscribe</button>
                  </div>
                </div>

                <div class="info-right-section">
                  <button class="like-btn"><i class="fa fa-thumbs-up"></i> ${formatLikes(video.likeCount)}</button>
                  <button class="dislike-btn"><i class="fa fa-thumbs-down"></i></button>
                  <button class="share-btn"><i class="fa fa-share"></i> Share</button>
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

  fillSidebarVideo(video.title);
}



async function fillSidebarVideo(keyword) {
  sidebarVideoHtml = '';
  searchVideos(keyword, 5)
    .then(async (videos) => {
      for (const video of videos) {
        const videoById = await searchVideo(video.id.videoId);
        console.log(videoById.duration)

        sidebarVideoHtml +=
          `
                    <div class="side-video-preview" data-video-id="${video.id.videoId}">
                        <div class="side-video-info-grid">
                            <div class="side-thumbnail-row">
                                <img class="side-profile" src="${video.snippet.thumbnails.medium.url}" alt="" />
                                <div class="side-video-time">${convertDurationToTimeString(videoById.duration)}</div>
                            </div>
                            <div class="side-video-info">
                                <div class="side-video-title-container">
                                <p class="side-video-title">
                                    ${video.snippet.title}
                                </p>
                                <p class="side-tree-dots">&#8942;</p>
                                </div>
                                <p class="side-video-author">${video.snippet.channelTitle}</p>
                                <p class="side-video-stats">${formatViews(videoById.viewCount)} · ${formatDate(video.snippet.publishedAt)}</p>
                            </div>
                        </div>
                    </div>
                `;
      }

      sidebarVideo.innerHTML = '';
      sidebarVideo.innerHTML = sidebarVideoHtml;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}