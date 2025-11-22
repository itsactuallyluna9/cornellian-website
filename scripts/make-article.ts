import { input, expand } from '@inquirer/prompts';
import { glob } from 'glob';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { parse, stringify } from 'yaml';
import slugify from 'slugify';

async function getMostRecentPubDate() {
    // we're in scripts/
    // articles are in src/articles/**/*.md
    
    // get all the articles
    const articles = await glob("src/content/articles/**/*.md");
    // now, we need to parse pubDate from the frontmatter yaml
    // in all articles. fun, yeah?
    const dates = await Promise.all(articles.map(async (article) => {
        const content = await readFile(article, "utf-8");
        const frontmatter = parse(content.split("---")[1]);
        return frontmatter.pubDate;
    }));
    // get the most recent date. pubDate could be any thing parseable by Date
    dates.sort((a, b) => (new Date(b)).getTime() - (new Date(a)).getTime());
    const date = new Date(dates[0]);
    // return it as a MMM DD YYYY string
    // so, like Dec 21 2024
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

async function fileExists(filename: string) {
    try {
        await readFile(filename);
        return true;
    }
    catch (e) {
        return false;
    }
}

function validateDate(date: string) {
	// can the date be parsed?
    if (isNaN(Date.parse(date))) {
        return "Invalid date";
    }
    // is the date before 2010?
    if (new Date(date) < new Date("2010-01-01")) {
        return "Date must be after 2010!";
    }
    return true;
}

const metadata = {
	title: await input({ message: "Title", required: true}),
	author: await input({ message: "Author", required: true }),
	pubDate: await input({ message: "Publication Date", default: await getMostRecentPubDate(), validate: validateDate})
}

let year = new Date(metadata.pubDate).getFullYear().toString();

if (!(await fileExists(`src/content/articles/${year}`))) {
    // if the directory doesn't exist, create it
    await mkdir(`src/content/articles/${year}`, { recursive: true });
}

// metadata.title = titleCase(metadata.title.toLowerCase());

let filename = slugify(metadata.title, { lower: true, strict: true }) + ".md";
// if filename exists, ask what to do
if (await fileExists(`src/content/articles/${year}/${filename}`)) {
    const action = await expand({
        message: "File already exists. What do you want to do?",
        choices: [
            { key: "r", value: "Rename", name: "Rename" },
            { key: "o", value: "Overwrite", name: "Overwrite" },
            { key: "c", value: "Cancel", name: "Cancel" }
        ]
    })
    if (action === "Cancel") {
        process.exit(0);
    }
    if (action === "Rename") {
        filename = await input({ message: "Filename", default: filename });
    }
    // overwrite... do nothing
}

// now, we need to write the frontmatter
const frontmatter = stringify(metadata);

await writeFile(`src/content/articles/${year}/${filename}`, `---\n${frontmatter}---\n\n`);

console.log(`Article created at src/articles/${year}/${filename}`);
