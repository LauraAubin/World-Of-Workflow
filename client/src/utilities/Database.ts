import { fetchRequest } from './Fetch';

export async function readFile() {
  return await fetchRequest('post', 'readFile', {}).then(resp => resp.json());
}

export async function writeTo(
  table: string,
  contents: { [key in any]: string | boolean }
) {
  await fetchRequest('post', 'writeTo', { table, contents }).then(resp =>
    resp.json()
  );
}

export async function readFrom(table: string, where?: any) {
  return await fetchRequest('post', 'readFrom', { table, where }).then(resp =>
    resp.json()
  );
}
