import { fetchRequest } from './Fetch';

type columnTypes = string | boolean | Date;

export async function readDatabase() {
  return await fetchRequest('get', 'readDatabase').then(resp => resp.json());
}

export async function writeTo(
  table: string,
  contents: { [key in any]: columnTypes }
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

export async function update(record: {}, where: { [key in any]: columnTypes }) {
  return await fetchRequest('post', 'update', { record, where }).then(resp =>
    resp.json()
  );
}
