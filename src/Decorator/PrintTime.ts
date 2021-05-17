export function Time(calllback?: (time) => void) {
  return function (Target, key, descriptor) {
    const func = descriptor.value;
    descriptor.value = async function(...args) {
      const startTime = new Date().getTime();
      const res = await func.apply(this, args);
      const endTime = new Date().getTime();
      const finalTime = endTime - startTime;
      calllback && calllback.call(this, finalTime, this);
      return res;
    }
  }
}