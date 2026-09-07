const isOverdue = (due:Date):boolean => {
  if (!due) return false;
  const now = new Date();
  return due < now;
};

export default isOverdue;
