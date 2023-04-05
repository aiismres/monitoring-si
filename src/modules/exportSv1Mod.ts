import { ISiObj1 } from "../app.types";

export async function exportSv1Mod(siState: ISiObj1[]) {

  console.log(siState);

  let res = await fetch("/api/exportsv1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(siState),
  });
  console.log(res);
  window.location.assign("/api/downloadsv1");

}
