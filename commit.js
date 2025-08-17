import simpleGit from 'simple-git';
import moment from 'moment';
import { appendFileSync } from 'fs';

const git = simpleGit();

async function makeFakeCommit(date) {
  const dateStr = date.format('YYYY-MM-DD');
  appendFileSync('README.md', `\n<!-- Fake commit for ${dateStr} -->`);
  await git.add('README.md')
          .commit(`Fake commit on ${dateStr}`, { '--date': dateStr });
  console.log(`✅ Commit added for ${dateStr}`);
}

// Generate commits from Feb 1 2023 to June 1 2025
(async () => {
  let currentDate = moment('2021-02-01');
  const endDate = moment('2025-08-15');
  
  while (currentDate <= endDate) {
    await makeFakeCommit(currentDate);
    currentDate = currentDate.add(1, 'day');
  }
})();