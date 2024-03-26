import { SechData } from '../app.types';

export function sortSechByDate(a: SechData, b: SechData) {
  if (a.planPodachi && b.planPodachi) {
    return (
      new Date(a.planPodachi).getTime() - new Date(b.planPodachi).getTime()
    );
  } else if (a.planPodachi && !b.planPodachi && b.krSrokPodachi) {
    return (
      new Date(a.planPodachi).getTime() - new Date(b.krSrokPodachi).getTime()
    );
  } else if (a.planPodachi && !b.planPodachi && !b.krSrokPodachi) {
    return 1;
  } else if (!a.planPodachi && b.planPodachi && a.krSrokPodachi) {
    return (
      new Date(a.krSrokPodachi).getTime() - new Date(b.planPodachi).getTime()
    );
  } else if (!a.planPodachi && b.planPodachi && !a.krSrokPodachi) {
    return -1;
  } else if (
    !a.planPodachi &&
    !b.planPodachi &&
    a.krSrokPodachi &&
    !b.krSrokPodachi
  ) {
    return -1;
  } else if (
    !a.planPodachi &&
    !b.planPodachi &&
    !a.krSrokPodachi &&
    b.krSrokPodachi
  ) {
    return 1;
  } else if (
    !a.planPodachi &&
    !b.planPodachi &&
    a.krSrokPodachi &&
    b.krSrokPodachi
  ) {
    return (
      new Date(a.krSrokPodachi).getTime() - new Date(b.krSrokPodachi).getTime()
    );
  } else return 0;
}
