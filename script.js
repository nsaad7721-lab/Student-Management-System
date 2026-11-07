class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    // Calculate Average using reduce
    calculateAverage() {
        const total = this.grades.reduce((sum, grade) => {
            return sum + grade;
        }, 0);

        return total / this.grades.length;
    }

    // Calculate Grade
    getGrade(average) {
        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }
    }

    // Calculate Final Result
    getResult(average) {
        if (average >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// Main Students Array
const studentsList = [
    new Student(101, "Ahmed", [45, 47, 46], 80),
    new Student(102, "Mona", [40, 44, 48], 90),
    new Student(103, "Ali", [80, 85, 90], 95),
    new Student(104, "Sara", [30, 35, 40], 70)
];

// Students Report
const studentsTable = document.getElementById("studentsTable");

studentsList.forEach(student => {
    const average = student.calculateAverage();
    const grade = student.getGrade(average);
    const result = student.getResult(average);

    console.log({
        name: student.name,
        average: average,
        grade: grade,
        result: result
    });

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${average.toFixed(2)}</td>
        <td>${grade}</td>
        <td class="${result === "ناجح" ? "success" : "review"}">
            ${result}
        </td>
    `;

    studentsTable.appendChild(row);
});

// Grace Committee - Filter
const strugglingStudents = studentsList.filter(student => {
    const average = student.calculateAverage();

    return average >= 40 && average <= 49;
});

// Grace Committee - Map
const graceStudents = strugglingStudents.map(student => {
    const oldAverage = student.calculateAverage();

    const newAverage = Math.min(oldAverage + 5, 100);

    return {
        id: student.id,
        name: student.name,
        oldAverage: oldAverage,
        newAverage: newAverage
    };
});

// Grace Committee - Reduce
const totalNewAverages = graceStudents.reduce((sum, student) => {
    return sum + student.newAverage;
}, 0);

// Average After Grace
const graceAverage = graceStudents.length > 0
    ? totalNewAverages / graceStudents.length
    : 0;

// Display Grace Committee
const graceTable = document.getElementById("graceTable");

graceStudents.forEach(student => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.oldAverage.toFixed(2)}</td>
        <td>${student.newAverage.toFixed(2)}</td>
    `;

    graceTable.appendChild(row);
});

// Display Average
document.getElementById("graceAverage").textContent =
    graceAverage.toFixed(2);

// Console Logging
console.log("===== Grace Committee =====");

console.log(graceStudents);

console.log("Average After Grace:", graceAverage);