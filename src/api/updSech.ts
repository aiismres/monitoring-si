import { SechData } from '../app.types';

export async function updSech(sechData: SechData) {
  try {
    let res = await fetch(`/api/editsech`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sechData),
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log('Ошибка при обновлении данных сечения', err);
  }
}
