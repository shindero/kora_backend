import { Response } from "express";
import moment from "moment";
import Project from "../../db/models/project";
import Task from "../../db/models/task";
import Timer from "../../db/models/timer"
import User from "../../db/models/user";

// return whether difference between now and date is greater than 5 seconds or not using moment.js library
export const isGreater = (date: string) => {
  const now = moment();
  const then = moment(date);
  const diff = now.diff(then);
  return diff > 30000;
}

export const addMiliseconds = (date: string, miliseconds: number) => {
  const then = moment(date);
  const newDate = then.add(miliseconds, 'ms');
  return newDate.toISOString();
}

// check if 30 seconds left until timer ends
export const checkTimer = (timer: Timer) => {
  const now = moment();
  const then = moment(timer.startDate).add(timer.user.notifyAfter, 'ms');
  const diff = then.diff(now);
  const miliseconds = 30000 - diff;
  if (miliseconds > 0) {
    return true;
  }
  return false;
}

const getMedian = async (user: User) => {
  if (!user) return 0;
  const timers = await Timer.findAll({ include: [{ model: User, where: { id: user.id } }] });
  const times = timers.map(timer => {
    return moment(timer.endDate).diff(moment(timer.startDate), 'minutes');
  });
  const filteredTimes = times.filter(time => time > 0);
  // get average of all times using standard deviation
  const average = filteredTimes.reduce((a, b) => a + b, 0) / filteredTimes.length;
  const standardDeviation = Math.sqrt(filteredTimes.reduce((a, b) => a + Math.pow(b - average, 2), 0) / filteredTimes.length);
  const median = average + standardDeviation;
  return median;
}


const handleNotif = async (timer: Timer) => {
  if (timer.endDate || !timer.user) return false;
  if (timer.user.notifyAfter) {
    // check if notifyAfter is greater than current timer time left 
    const now = moment();
    const then = moment(timer.startDate).add(timer.user.notifyAfter, 'ms');
    const timeLeft = moment(then).diff(now, 'milliseconds');
    const diff = then.diff(now, 'ms', true);
    if (diff <= 0) {
      return true;
    }
    return timeLeft;
  } else {
    // get median time and check if current timer time left is greater than median time
    const median = await getMedian(timer.user);
    const now = moment();
    const then = moment(timer.startDate).add(median, 'minutes');
    const diff = then.diff(now, 'ms', true);
    const timeLeft = moment(then).diff(now, 'milliseconds');
    if (diff <= 108000) {
      return true;
    }
    return timeLeft;
  }
}


export const calculateValues = async (arrayOfNotifs: Array<any>, arrayOfWarnings: Array<any>, howLongUntilStop: Array<any>) => {
  const timers = await Timer.findAll({ include: [{ model: User, as: 'user' }] });
  const runningTimers = timers.filter(timer => !timer.endDate);
  if (!timers) return;
  await runningTimers.forEach(async (timer) => {
    const response = await handleNotif(timer);
    howLongUntilStop.push(response);
    if (typeof response !== 'number' && response) {
      arrayOfNotifs.push(timer.user.id);
      timer.update({ endDate: moment().format(), forcedStop: true });
    }
    if (timer.user?.notifyAfter && checkTimer(timer)) {
      arrayOfWarnings.push(timer.user.id);
    }
  });
  // sleep for 1s 
  await new Promise(resolve => setTimeout(resolve, 500));
}

export const getRealTimeData = async () => {
  const timers = await Timer.findAll({
    where: {
      endDate: null
    },
    include: [
      { model: Task, as: 'task', include: [{ model: Project, as: 'project' }] },
      { model: User, as: 'user' }
    ]
  });
  return timers;
}

export const calculateData = async () => {
  // await calculateValues();
}
