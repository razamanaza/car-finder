import { PlaywrightCrawler, Dataset } from "crawlee";

// A simple crawler that will be used to scrape the data.
const crawler = new PlaywrightCrawler({
  // Use the requestHandler to process each of the crawled pages.
  async requestHandler({ request, page, enqueueLinks, log }) {
    const title = await page.title();
    log.info(`Title of ${request.loadedUrl} is '${title}'`);

    // Save results as JSON to ./storage/datasets/default
    await Dataset.pushData({ title, url: request.loadedUrl });

    // Extract links from the current page
    // and add them to the crawling queue.
    await enqueueLinks();
  },
  // Let's limit our crawls to make our tests shorter and safer.
  maxRequestsPerCrawl: 10,
});

// Add first URL to the queue and start the crawl.
async function run() {
  await crawler.run(["https://crawlee.dev"]);
}

run().catch((err) => console.error(err));
