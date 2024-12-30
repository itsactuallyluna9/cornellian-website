import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';

export async function GET(context) {
	const comics = await getCollection("comics");
	return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: comics.map((post) => ({
     ...post.data,
     link: `/comics/${post.id}/`,
    })),
  });
}
