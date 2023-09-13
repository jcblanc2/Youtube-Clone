import { searchVideos, searchChannel, searchVideo } from './search.js';
import { formatDate } from './utils.js';

let videoGridHtml = '';

searchVideos("paysage suisse")
    .then((videos) => {
        videos.forEach((video) => {
            videoGridHtml +=
                `
                <div class="video-preview" data-video-id=${video.id.videoId}>
                    <div class="thumbnail-row">
                        <img class="thumbnail" src="${video.snippet.thumbnails.medium.url}" alt="" />
                        <div class="video-time">14:20</div>
                    </div>
                    <div class="video-info-grid">
                        <div class="thumbnail-profile">
                        <img class="profile" src="${getChannelPhotoProfile(video.snippet.channelId)}" alt="" />
                        </div>
                        <div class="video-info">
                        <div class="video-title-container">
                            <p class="video-title">
                            ${video.snippet.title}
                            </p>
                            <p class="tree-dots">&#8942;</p>
                        </div>
                        <p class="video-author">${video.snippet.channelTitle}</p>
                        <p class="video-stats">3.4M views · ${formatDate(video.snippet.publishedAt)}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        document.querySelector('.video-grid').innerHTML = videoGridHtml;
    })
    .catch((error) => {
        console.error('Error:', error);
    });


function getChannelPhotoProfile(id) {
    searchChannel(id)
        .then((channel) => {
            console.log(channel)

            return channel.snippet.thumbnails.default.url;

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function getVideo(id) {
    searchChannel(id)
        .then((channel) => {
            console.log(video)

            return channel.snippet.thumbnails.default.url;

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}



