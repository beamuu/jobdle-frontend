export const headersParams = (token: string) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const dateFormat = (today: Date) => {
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  let currentDate = `${dd}/${mm}/${yyyy}`;
  return currentDate;
};
