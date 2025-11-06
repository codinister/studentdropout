

/*############################# 
    * Y-m-d Date Format
#############################*/
function ymd(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const mnt = Number(month) < 10 ? '0' + month : month;
  const dy = Number(day) < 10 ? '0' + day : day;
  return `${year}-${mnt}-${dy}`;
}


function dmy(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const mnt = Number(month) < 10 ? '0' + month : month;
  const dy = Number(day) < 10 ? '0' + day : day;
  return `${dy}-${mnt}-${year}`;
}

function ymdslash(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const mnt = Number(month) < 10 ? '0' + month : month;
  const dy = Number(day) < 10 ? '0' + day : day;
  return `${mnt}/${dy}/${year}`;
}

function ym(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const mnt = Number(month) < 10 ? '0' + month : month;
  return `${year}-${mnt}`;
}

function formatDate(dateObject: Date) {
  const d = new Date(dateObject);
  const day = d.getDate();
  const months = d.getMonth();
  const mnth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = mnth[months];
  const year = d.getFullYear();
  const days = day < 10 ? '0' + day : day;
  const monthx = Number(month) < 10 ? '0' + month : month;
  const date = days + ' ' + monthx + ' ' + year;
  return date;
}

const year = (date: Date) => {
  const dt = new Date(date);
  return dt.getFullYear();
};

const month = (date: string) => {
  const dt = new Date(date);
  return dt.getMonth() + 1;
};

function formatMonth(m: string) {
  const d = new Date(m);
  const months = d.getMonth();
  const mnth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = mnth[months];
  return month;
}


const dateTime = (date: string ) => new Date(date)


export {
  dateTime,
  ymd,
  dmy,
  formatDate,
  ym,
  year,
  month,
  ymdslash,
  formatMonth
};
