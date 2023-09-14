import { searchVideos, searchChannel, searchVideo } from './search.js';
import { formatDate, formatViews, convertDurationToTimeString } from './utils.js';

let videoGridHtml = '';

// searchVideos("paysage suisse")
//     .then(async (videos) => {
//     for (const video of videos) {
//         const channelPhotoProfile = await searchChannel(video.snippet.channelId);
//         const { duration, viewCount } = await searchVideo(video.id.videoId);

//         videoGridHtml +=
//             `
//                 <div class="video-preview" data-video-id=${video.id.videoId}>
//                     <div class="thumbnail-row">
//                         <img class="thumbnail" src="${video.snippet.thumbnails.medium.url}" alt="" />
//                         <div class="video-time">${convertDurationToTimeString(duration)}</div>
//                     </div>
//                     <div class="video-info-grid">
//                         <div class="thumbnail-profile">
//                         <img class="profile" src="${channelPhotoProfile}" alt="" /> <!-- Use the awaited result here -->
//                         </div>
//                         <div class="video-info">
//                         <div class="video-title-container">
//                             <p class="video-title">
//                             ${video.snippet.title}
//                             </p>
//                             <p class="tree-dots">&#8942;</p>
//                         </div>
//                         <p class="video-author">${video.snippet.channelTitle}</p>
//                         <p class="video-stats">${formatViews(viewCount)} · ${formatDate(video.snippet.publishedAt)}</p>
//                         </div>
//                     </div>
//                 </div>
//             `;
//     }
//     document.querySelector('.video-grid').innerHTML = videoGridHtml;
// })
//     .catch((error) => {
//         console.error('Error:', error);
//     });




