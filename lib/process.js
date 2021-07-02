import { JSDOM } from 'jsdom';


const baseUrl = 'https://www.youtube.com';

export default function process(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  

  return [...document.querySelectorAll('.product_pod')]
    .map((videoElement) => ({
      title: videoElement.querySelector('.title h1').textContent,
      media: videoElement.querySelector('.html5-main-video video').src
    }));
}
