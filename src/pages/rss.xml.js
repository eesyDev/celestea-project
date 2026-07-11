import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.noindex)
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  return rss({
    title: 'Celestea — астрология, гороскопы и эзотерика',
    description:
      'Свежие статьи Celestea: астрология, нумерология, знаки зодиака, ритуалы, демонология и лунные практики.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/blog/${post.data.slug ?? post.slug}/`,
    })),
    customData: `<language>ru-RU</language>`,
  });
}
