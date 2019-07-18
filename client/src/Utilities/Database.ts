import { fetchRequest } from './Fetch';

// const whereRegex = new RegExp('[a-z]+\s?[<>]?={2}?\s?[a-z]+');
/*
  Regex description:

  One or more of any letter in this range: [a-z]+
  Optional space: \s?
  Optional of either of these symbols: [<>]?
  Optional of 2 of the equals sign: ={2}?
*/

export async function readFile() {
  return await fetchRequest('post', 'readFile', {}).then(resp => resp.json());
}

export async function writeTo(table: string, contents: { message: string }) {
  await fetchRequest('post', 'writeTo', { table, contents }).then(resp =>
    resp.json()
  );
}

export async function readFrom(table: string, where?: any) {
  /*
  if (!whereRegex.test(where))
    return {
      error:
        'The "where" parameter is of the wrong format or includes an unknown condition'
    };
  */

  return await fetchRequest('post', 'readFrom', { table, where }).then(resp =>
    resp.json()
  );
}
