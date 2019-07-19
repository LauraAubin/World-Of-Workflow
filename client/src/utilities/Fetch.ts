export async function fetchRequest(type: string, path: string, body: any) {
  return await fetch(path, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    method: type.toUpperCase()
  });
}
