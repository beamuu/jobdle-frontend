interface Job extends EditableJob, JobManaged {
  fullname: string;
  userId: string;
  _id: string;
  date: string;
  employee: array[];
  status: string;
}

interface EditableJob {
  title?: string;
  detail?: string;
  category?: object;
  // wage?: string;
  note?: string;
  location?: string;
  deadline?: string | undefined;
  status?: string;
  employeeId?: array[];
}
