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
  let body = marked.parse(blog.body)
              .replace(/<a/g, '<a target="_blank" class="underline"')
              .replace(/<h1/g, '<br><h1 class="lg:text-3xl text-2xl underline"')
              .replace(/<\/h1>/g, '</h1><br>')
              .replace(/<h2/g, '<br><h2 class="lg:text-2xl text-xl mr-2 underline"')
              .replace(/<\/h2>/g, '</h2><br>')
              .replace(/<h3/g, '<br><h3 class="lg:text-xl text-lg mr-3 underline"')
              .replace(/<\/h3>/g, '</h3><br>')
              .replace(/<ol/g, '<ol class="list-decimal list-inside m-3"')
              .replace(/<\/ol>/, '</ol><br>')
              .replace(/<ul/g, '<ul class="list-disc list-inside m-3"')
              .replace(/<\/ul>/, '</ul><br>')

  content.innerHTML = body;
}