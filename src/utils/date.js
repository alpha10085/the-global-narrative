export const isValidDate = (date) => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return date;
  }

  if (typeof date === "string") {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) ? parsedDate : false;
  }

  return false;
};

export const formatTime = (t) => {
  if (!isValidDate(t)) {
    return "...";
  }
  let time = new Date(t);
  const FormateDigets = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = FormateDigets.format(Math.floor(time % 60));

  if (hours === 0) {
    return `${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};
export const formatDate = (date) => {
  if (!isValidDate(date)) {
    return "...";
  }
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
export const formatTimeAgo = (date = 0, translations = {}) => {
  try {
    const currentDate = new Date();
    const givenDate = new Date(date);

    const isFuture = givenDate > currentDate;

    const diffInMilliseconds = Math.abs(currentDate - givenDate);
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximate
    const diffInYears = Math.floor(diffInDays / 365); // Approximate

    if (isFuture) {
      return `${translations?.in} ${
        diffInYears > 0
          ? `${diffInYears} ${
              diffInYears === 1 ? translations?.year : translations?.years
            }`
          : diffInMonths > 0
          ? `${diffInMonths} ${
              diffInMonths === 1 ? translations?.month : translations?.months
            }`
          : diffInDays > 0
          ? `${diffInDays} ${
              diffInDays === 1 ? translations?.day : translations?.days
            }`
          : diffInHours > 0
          ? `${diffInHours} ${
              diffInHours === 1 ? translations?.hour : translations?.hours
            }`
          : diffInMinutes > 0
          ? `${diffInMinutes} ${
              diffInMinutes === 1 ? translations?.minute : translations?.minutes
            }`
          : `${diffInSeconds} ${
              diffInSeconds === 1 ? translations?.second : translations?.seconds
            }`
      }`;
    } else {
      return `${
        diffInYears > 0
          ? `${diffInYears} ${
              diffInYears === 1 ? translations?.year : translations?.years
            }`
          : diffInMonths > 0
          ? `${diffInMonths} ${
              diffInMonths === 1 ? translations?.month : translations?.months
            }`
          : diffInDays > 0
          ? `${diffInDays} ${
              diffInDays === 1 ? translations?.day : translations?.days
            }`
          : diffInHours > 0
          ? `${diffInHours} ${
              diffInHours === 1 ? translations?.hour : translations?.hours
            }`
          : diffInMinutes > 0
          ? `${diffInMinutes} ${
              diffInMinutes === 1 ? translations?.minute : translations?.minutes
            }`
          : `${diffInSeconds} ${
              diffInSeconds === 1 ? translations?.second : translations?.seconds
            }`
      } ${translations?.ago}`;
    }
  } catch (e) {
    return "";
  }
};
export const IsTimeGone = (t) => {
  if (!isValidDate(t)) {
    return false;
  }
  return t < new Date().getTime() || t === 0;
};
export const addDays = (dateString, days) => {
  if (!isValidDate(dateString)) {
    return false;
  }
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toDateString();
};
export const compareDates = (d1, d2) => {
  try {
    const date1 = new Date(d1).getTime();
    const date2 = new Date(d2).getTime();
    return date1 > date2;
  } catch {
    return false;
  }
};
// like 7 september 2015
export const formateDateEn_GB = (date = "") => {
  try {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    return "...";
  }
};
export const parseDate = (dateString) => {
  const [day, month, year] = dateString?.split(" ");
  return new Date(`${day} ${month} ${year}`);
};
