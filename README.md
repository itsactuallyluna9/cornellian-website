# The Cornellian Website

## Prerequisites

* [VSCode](https://code.visualstudio.com)
* [Bun](https://bun.sh)
* A GitHub Account

### Installation

```sh
bun install
bun run dev
```

Open http://localhost:4321 to see the site!

## Common

### Articles

To start, add a new Markdown file in `src/content/articles`. It's important to note that the file name will be the URL of the page! (So, `a-response-to-the-fys-faculty-edition.md` turns into `/articles/a-response-to-the-fys-faculty-edition/`) 

> [!TIP]
> You can download Markdown from Google Docs! Note that you'll need to go in and manually specify the images in the Markdown, because Google Docs embeds them for some reason (vastly reducing their quality in the process).

Inside, you'll need to add a *frontmatter*, which tells the website important details like the author and the title. The frontmatter is formatted like the following:

```yaml
---
title: "Article Title"
author: "Luna"
pubDate: "Dec 16 2023"
# note that you can also add some other fields:
description: "Description for the RSS feed. (Defaults to 'No description!')"
updatedDate: "Dec 16 2024" # adds a "Last Updated" field
heroImage: "../../images/blog-placeholder-2.jpg" # path to an image
---
```

After you finish the frontmatter, you can add either regular Markdown (or use something like [MDX](https://mdxjs.com) if you need to get *really* fancy) like usual!

Once you finish, the article will be accessible through the development site. If there's an error (usually the frontmatter not being properly formatted), there will be a whole-screen popup detailing what went wrong.

### Comics

**TODO**

### Home / About Page

## Advanced

## Publishing

Simply commit your changes, and push! The site will automatically update if the changes are valid.

## Folder Structure

## Credits

* Luna - Lead Developer
* Steph Ango - [Flexoki (Color Palette)](https://stephango.com/flexoki)
* Murray Page, James Belding and Eliza Carlson - Cornellian 24-25 E-Board 
* Morgan Dalsing - Comic Page Design
 