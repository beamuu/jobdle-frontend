interface Job extends EditableJob, JobManaged {
  fullname: string;
  userId: string;
  _id: string;
  date: string;
  employeeId: array[];
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

interface ManagedJob {
  employeeId: array[];
  status: string;
}
