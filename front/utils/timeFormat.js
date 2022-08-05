


export function msToTime(duration) {
    const localeDuration = duration + (1000 * 60 * 60 * 9)
    let second = Math.floor(localeDuration/ 1000);
    let minute = Math.floor(second / 60);
    let hour = Math.floor(minute /60) ;

    second = second % 60;
    minute = minute % 60;
    hour = hour % 24
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }
