import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';


const blogDir = join(process.cwd(), '../blogs');

fs.readdirSync('../website/app/blogs').forEach((file) => {
  const filePath = join('../website/app/blogs', file);
  fs.unlinkSync(filePath);
});

const files = fs.readdirSync(blogDir);

const indexPage = `
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="The Nexus Blog" />
  <meta name="keywords" content="Nexus, Blog, Peerplex" />
  <meta name="author" content="Nexus Camp" />
  <meta name="robots" content="index, follow" />

  <link rel="icon" type="image/svg+xml" href="https://avatars.githubusercontent.com/u/166108752?v=4" />
  <link rel="stylesheet" href="/public/style.css">
  <script type="module" src="/public/index.js"></script>

  <title>Blogs</title>

</head>

<body>
  <div id="header" class="flex justify-between p-8 ">
    <div class="">V1</div>
    <div class="font-serif text-5xl underline">The Nexus Blog</div>
    <div>
      <a href="https://github.com/nexus-camp"><img src="/public/github.svg" class="h-12 w-12" /></a>
    </div>
  </div>
  <div id="body" class="flex justify-center flex-wrap gap-7 p-10">
    CARD_REPLACEMENT
  </div>


</body>

</html>
`
const cards: string[] = [];

files.forEach((file) => {
    const filePath = join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const slug = file.replace('.md', '') + (Math.random().toString(36).substring(8));


    const card = `
    <div id="${slug}" class="border-black border w-1/4 p-5 rounded-xl" data-card>
        <img src="${data.picture}" alt="Blog Image" class="w-full h-32 object-cover rounded">
        <h2 class="font-bold text-xl mt-6">${data.title}</h2>
        <p class="mt-3">${data.description}</p>
        <p class="mt-3 text-gray-500 text-sm">Date: ${data.date}</p>
    </div>
    `;

    cards.push(card);

    const blogPage = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="The Nexus Blog" />
    <meta name="keywords" content="Nexus, Blog, Peerplex" />
    <meta name="author" content="Nexus Camp" />
    <meta name="robots" content="index, follow" />

    <link rel="icon" type="image/svg+xml" href="https://avatars.githubusercontent.com/u/166108752?v=4" />
    <link rel="stylesheet" href="/public/style.css">

    <title>Blogs</title>
</head>

<body>
    <div id="header" class="flex justify-between p-8 ">
        <div class="">V1</div>
        <div class="font-serif text-5xl underline">The Nexus Blog</div>
        <div>
            <a href="https://github.com/nexus-camp"><img src="/public/github.svg" class="h-12 w-12" /></a>
        </div>
    </div>

    <div class="flex justify-center">
      <img src="${data.picture}" class="max-h-96 p-2 rounded-3xl">
    </div>

    <h1 class="text-5xl p-10">
        ${data.title}
    </h1>

    <p class="p-10 bg-slate-100 rounded-2xl text-lg m-5">
        ${content.replace(/\n/g, '<br>')}
    </p>

    <div class="w-11/12 flex justify-around m-10 text-xl">

        <a href="/"> 🏠 Home Page</a> <a href="https://github.com/nexus-camp"> 🌐 Github</a>
    </div>
</body>

</html>
`

fs.writeFileSync(join(process.cwd(), '../website/app/blogs/', `${slug}.html`), blogPage);

});

const finalHtml = indexPage.replace('CARD_REPLACEMENT', cards.join('\n'));

fs.writeFileSync(join(process.cwd(), '../website/app', 'index.html'), finalHtml);