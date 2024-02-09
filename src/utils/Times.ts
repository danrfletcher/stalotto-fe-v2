export interface CountdownObject {
  months: number,
  days: number,
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const getTimeDifference = (time: Date): CountdownObject => {
    const now = new Date();

    const isPast = time < now;
    let delta = Math.abs(time.getTime() - now.getTime()) / 1000;
  
    const months = Math.floor(delta / 2592000);
    delta -= months * 2592000;
  
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
  
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
  
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
  
    const seconds = Math.floor(delta % 60); 

    let parts: CountdownObject = {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: isPast,
    }
    
    if (months > 0) parts.months = months
    if (days > 0) parts.days = days;
    if (hours > 0) parts.hours = hours;
    if (minutes > 0) parts.minutes = minutes;
    if (seconds > 0) parts.seconds = seconds;

    return parts
  };
  