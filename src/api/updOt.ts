import { Ot } from '../app.types';

export async function updOt(selectedOt: Ot | null) {
  try {
    let res = await fetch(`/api/editot`, {
      method: 'post',
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
