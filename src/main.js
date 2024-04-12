import './style.css';
import {marked} from 'marked';
import frontMattter from 'front-matter';

const mainPage = document.querySelector('#mainPage');
const blogPage = document.querySelector('#blogPage');

console.log(mainPage, blogPage)

function openBlogPage(id) {
  mainPage?.classList.add('hidden');
  blogPage?.classList.remove('hidden');
  window.history.pushState({}, '', `?id=${id}`);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  makeBlogPage()
}

document.querySelectorAll('[data-card]').forEach(card => {
  card.addEventListener('click', async () => openBlogPage(card.id))
})

if (new URLSearchParams(window.location.search).get('id')) {
  openBlogPage(new URLSearchParams(window.location.search).get('id'))
}

async function makeBlogPage() {

  const img = document.getElementById('blogImage');
  const title = document.getElementById('blogTitle');
  const content = document.getElementById('blogContent');

  const blogId = new URLSearchParams(window.location.search).get('id');
  const rawBlog = await fetch(`./blogs/${blogId}.md`).then(res => res.text());

  const blog = frontMattter(rawBlog);

  img.setAttribute('src', blog.attributes.picture);
  title.textContent = blog.attributes.title;
  content.innerHTML = marked.parse(blog.body);
}