const getUpdatedAt = () => {
  const full = new Date();
  const hours = full.getHours();
  const minutes = full.getMinutes();
  return `오늘 ${hours}시 ${minutes}분`;
};

export default getUpdatedAt;
