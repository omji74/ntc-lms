import { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";


import {StudentApi} from '../../client/backend-api/student'

dayjs.extend(utc);

// const [students, setStudents] = useState([]);
// const fetchStudents = async () => {
//     const { students } = await StudentApi.getAllStudents()
//     setStudents(students);
    
// }

export const calcStDues = async (students, bookReturnDeadline = 14) => {
  const studentsWithDues = [];
  const [students, setStudents] = useState([]);
const fetchStudents = async () => {
    const { students } = await StudentApi.getAllStudents()
    setStudents(students);
    
}

  for (const student of students) {
    const { roll_number, bookBorrowedDate } = student;

    // Check if student has borrowed a book
    if (!bookBorrowedDate) {
      studentsWithDues.push({ roll_number, dueAmount: 0 });
      continue;
    }

    // Calculate days since book was borrowed
    const daysSinceBorrowed = dayjs.utc().diff(dayjs.utc(bookBorrowedDate), "day");

    // Check if overdue
    if (daysSinceBorrowed > bookReturnDeadline) {
      const overdueDays = daysSinceBorrowed - bookReturnDeadline;
      const dueAmount = calculateOverdueAmount(overdueDays); // Replace with your overdue calculation logic
      studentsWithDues.push({ roll_number, dueAmount });
    } else {
      studentsWithDues.push({ roll_number, dueAmount: 0 });
    }
  }

  return studentsWithDues;
};

// Placeholder function to calculate overdue amount. Replace with your logic
const calculateOverdueAmount = (overdueDays) => {
  // Replace with your logic to calculate due amount based on overdue days (e.g., per day rate)
  return overdueDays * 5.0; // Replace 1.0 with your penalty per day
};