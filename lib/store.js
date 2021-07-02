import Video from './models/Video.js';

export default function save(videos) {
  console.log(`You are saving ${videos.length} videos`);
  return Promise.all(videos.map(video => Video.insert(video)));
}
