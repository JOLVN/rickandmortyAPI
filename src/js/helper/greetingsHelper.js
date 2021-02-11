export function getGreetingByTime() {

  let momentNow;
  let date = new Date();
  let hour = date.getHours();

  if (hour < 12) {
    momentNow = 'morning';
  } else if (hour > 12 && hour < 17) {
    momentNow = 'afternoon';
  } else {
    momentNow = 'evening';
  }

  return momentNow;

}