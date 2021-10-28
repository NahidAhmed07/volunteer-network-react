const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const processDate = (date) => {
  const strdata = date.split("/");
  return `${strdata[0]} ${month[strdata[1] - 1]}, ${strdata[2]}`;
};

export const processDate2 = (date) => {
  const strdata = date.split("-");
  return `${strdata[0]} ${month[strdata[1] - 1]}, ${strdata[2]}`;
};

const colors = ["#FFBD3E", "#FF7044", "#3F90FC", "#421FCF"];
const findColors = [];
export const randomColor = () => {
  const index = Math.floor(Math.random() * 4);
  const currentColor = colors[index];
  if (findColors.includes(currentColor)) {
    return randomColor();
  } else {
    findColors.shift();
    findColors.push(currentColor);
    return colors[index];
  }
};

export const randomId = () => {
  const randomNumber = Math.round(Math.random() * 1000000);
  const id = `EV${randomNumber}ENT`;
  return id;
};
