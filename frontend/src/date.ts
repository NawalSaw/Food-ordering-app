const day = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const months = [
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
]


export const getMonth = (month: number) => {
  const monthWithIndex = months[month]; // 0 = month
  return monthWithIndex;
 }

export const getDay = (index: number) => {
  const dayWithIndex = day[index]; // 0 = day
  return dayWithIndex;
};

