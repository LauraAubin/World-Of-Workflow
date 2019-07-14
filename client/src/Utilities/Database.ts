import { fetchRequest } from './Fetch';

export async function readFile() {
  return await fetchRequest('post', 'readFile', { file: './DB.csv' }).then(resp =>
    resp.json()
  );
}
