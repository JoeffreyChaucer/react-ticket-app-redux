import { serverSetUp } from './setUpServer';
import { databaseSetUp } from './setUpDatabase';

async function init() {
  await serverSetUp();
  await databaseSetUp();
}

init();
