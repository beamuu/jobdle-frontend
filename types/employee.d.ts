interface Employee extends EditableEmployee {
  status: string;
  works: [];
  _id: string;
}
interface EditableEmployee {
  firstname: string;
  lastname: string;
  email: string;
  tel: string;
  age: number;
  // detail: string;
  gender: string;
}
