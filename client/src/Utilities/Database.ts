import { fetchRequest } from './Fetch';

export async function readFile() {
  return await fetchRequest('post', 'readFile', { file: './DB.js' }).then(
    resp => resp.json()
  );
}

export async function writeTo(table: string, contents: { message: string }) {
  await fetchRequest('post', 'writeTo', { table, contents }).then(resp =>
    resp.json()
  );
}
