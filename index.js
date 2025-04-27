import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const getRandomDate = () => {
  // Start: Jan 1, 2022
  const start = moment("2022-01-01");
  // End: Dec 31, 2025
  const end = moment("2025-03-17");

  // Get a random number of days between start and end
  const daysDiff = end.diff(start, 'days');
  const randomDays = random.int(0, daysDiff);

  // Add random days to start
  return start.add(randomDays, 'days').format();
};

const makeCommits = (n) => {
  if (n === 0) {
    return simpleGit().push();
  }

  const date = getRandomDate();
  const data = { date: date };
  console.log(date);

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(1000); // You can change 300 to whatever number of commits you want
