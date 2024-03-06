import { Ot } from '../app.types';

export async function deleteOt(selectedOt: Ot | null) {
  try {
    let res = await fetch(`/api/delot`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedOt),
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
