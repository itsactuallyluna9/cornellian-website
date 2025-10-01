import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

// /home/luna/Code/cornellian-website/scripts/chs-print.ts

const BASE_URL = 'http://localhost:4321/articles';
const OUTPUT_DIR = path.resolve(process.cwd(), 'article-pdfs');
const NAV_TIMEOUT = 30000; // ms

function sanitizeFilename(name: string) {
    return name
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9\-_.]/g, '')
        .replace(/-+/g, '-')
        .slice(0, 200) || 'article';
}

async function ensureOutputDir() {
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
    } catch {
        // ignore
    }
}

(async () => {
    await ensureOutputDir();

    const browser = await puppeteer.launch({ headless: true });
    try {
        const page = await browser.newPage();
        page.setViewport({ width: 1200, height: 800 });

        console.log(`Loading index: ${BASE_URL}`);
        await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: NAV_TIMEOUT });

        // Collect article links found under /articles
        const links: string[] = await page.$$eval('a[href]', (anchors) =>
            Array.from(anchors)
                .map((a) => a.href)
                .filter((h) => {
                    try {
                        const u = new URL(h);
                        return u.pathname.startsWith('/articles') || u.pathname.includes('/articles/');
                    } catch {
                        return false;
                    }
                })
        );

        // dedupe and keep order
        const unique = Array.from(new Set(links));
        if (unique.length === 0) {
            console.log('No article links found on the index page.');
            return;
        }

        console.log(`Found ${unique.length} articles. Starting PDF generation...`);

        let i = 1;
        for (const link of unique) {
            const p = await browser.newPage();
            try {
                console.log(`[${i}/${unique.length}] Navigating to ${link}`);
                await p.goto(link, { waitUntil: 'networkidle2', timeout: NAV_TIMEOUT });

                // prefer a page title or H1 for filename
                let title = await p.title();
                if (!title || title.trim().length === 0) {
                    const h1 = await p.$eval('h1', (el) => el.textContent || '').catch(() => '');
                    title = h1 || `article-${i}`;
                }

                const filename = `${String(i).padStart(3, '0')}-${sanitizeFilename(title)}.pdf`;
                const outPath = path.join(OUTPUT_DIR, filename);

                // Emulate print media and create PDF
                await p.emulateMediaType('print');
                await p.pdf({
                    path: outPath,
                    format: 'Letter',
                    printBackground: true,
                });

                console.log(`Saved: ${outPath}`);
            } catch (err) {
                console.error(`Error processing ${link}:`, (err as Error).message);
            } finally {
                await p.close();
                i++;
            }
        }
    } finally {
        await browser.close();
    }

    console.log('Done.');
})();
