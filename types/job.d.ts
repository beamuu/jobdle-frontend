interface Job {
  category: {
    name: string;
    minWage: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  deadline: string;
  detail: string;
  employee: [Employee];
  employeeId: [];
  fullname: string;
  location: string;
  status: string;
  title: string;
  updatedAt: string;
  userId: string;
  __v: 0;
  _id: string;
}

interface JobEditable {
  title: string;
  detail: string;
  category: {
    name: string;
    minWage: number;
  };
  location: string;
  deadline: string;
  status: string;
}
