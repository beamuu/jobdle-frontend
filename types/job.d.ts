interface Job extends EditableJob {
  fullname: string;
  userId: string;
  _id: string;
  date: string;
  status: string;
}

interface EditableJob {
  title: string;
  detail: string;
  category: string;
  wage: string;
  note: string;
  location: string;
  deadline: string;
}
