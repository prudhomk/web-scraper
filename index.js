import ingest from './lib/ingest.js';
import process from './lib/process.js';
import save from './lib/store.js';

// Promise.all() => {
//   return ingest(`https://www.youtube.com/results?search_query=${search}`)
//     .then(html => process(html));
// }
//   .then(videos => videos.flat())
//   .then(videos => save(videos));
ingest('https://www.youtube.com/results?search_query=dog')
  .then(video => console.log(video));

