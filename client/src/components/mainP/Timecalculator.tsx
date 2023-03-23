//상대시간 계산기
//시간차를 계산하여 밀리초로 바꿔주는 로직
export const getDateDiff = (date: string | Date): number => {
  const date1 = new Date();
  const date2 = new Date(date);
  const msDiff = date1.getTime() - date2.getTime();
  return Math.ceil(msDiff / 1000);
};
//시간 차이를 년,월,일로 변환
export const timeSince = (date: string) => {
  const seconds = getDateDiff(date);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + '년';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + '달';
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + '일';
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + '시간';
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + '분';
  }
  return '방금';
};
