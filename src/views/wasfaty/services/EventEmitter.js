import moment from "moment";
import { ReplaySubject } from "rxjs";
export const LOCATION_CHANGE = "LOCATION_CHANGE";

const replaySubject = new ReplaySubject(1);

export default {
  next: replaySubject.next.bind(replaySubject),
  subscribe: replaySubject.subscribe.bind(replaySubject),
};

// window.addEventListener("beforeunload", (ev) => {
//   ev.preventDefault();
//   replaySubject.next("beforeunload");
//   alert(window.location.href);
//   return (ev.returnValue = "Are you sure you want to close?");
// });

const systemClock = new ReplaySubject(1);

export const SystemClock = {
  next: systemClock.next.bind(systemClock),
  subscribe: systemClock.subscribe.bind(systemClock),
};

setInterval(() => {
  SystemClock.next(moment());
}, 1000 * 60);
