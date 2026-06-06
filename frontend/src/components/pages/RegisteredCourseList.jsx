import { useState } from 'react'
import PersonalDetailsPage from '../courseList/PersonalDetailsPage';
import CourseHeader from "../courseList/CourseHeader";
import StatBar from '../courseList/StatBar';
import CourseGrid from '../courseList/CourseGrid';


const defaultCourses = [
    { code: 'CIT 101', name: 'Introduction to Computing' },
    { code: 'CIT 201', name: 'Systems Analysis & Design' },
    { code: 'CIT 231', name: 'Data Structures' },
    { code: 'MTH 102', name: 'Elementary Mathematics II' },
    { code: 'GST 101', name: 'Use of English' },
    { code: 'CIT 241', name: 'Computer Architecture' },
    { code: 'CIT 251', name: 'Introduction to Algorithms' },
    { code: 'GST 201', name: 'Nigerian Peoples & Culture' },
    { code: 'CIT 261', name: 'Database Management' },
]

function normalizeCourse(course, index) {
    if (typeof course === "object" && course !== null) {
        return {
            code: course.code || `COURSE ${index + 1}`,
            name: course.name || "Registered course",
        }
    }

    const rawCourse = String(course || "").trim()
    const codeMatch = rawCourse.match(/^([A-Za-z]{2,4}\s*\d{3}[A-Za-z]?)/)

    if (!rawCourse) {
        return { code: `COURSE ${index + 1}`, name: "Registered course" }
    }

    if (!codeMatch) {
        return { code: rawCourse, name: "Registered course" }
    }

    const code = codeMatch[1].replace(/\s+/g, " ").toUpperCase()
    const name = rawCourse
        .slice(codeMatch[0].length)
        .replace(/^[-:|,]\s*/, "")
        .trim()

    return { code, name: name || "Registered course" }
}

function getInitialCourses(userCourses) {
    const normalizedCourses = Array.isArray(userCourses)
        ? userCourses.map(normalizeCourse).filter((course) => course.code.trim())
        : []

    return normalizedCourses.length >= 9 ? normalizedCourses.slice(0, 12) : defaultCourses
}

function RegisteredCourseList({ user, onUserUpdate }){
    const [editing, setEditing] = useState(false);
    const [snapshot, setSnapshot] = useState(() => getInitialCourses(user?.courses))
    const [courses, setCourses] = useState(() => getInitialCourses(user?.courses))

    const handleEdit = () => {
        setSnapshot(courses);
        setEditing(true);
    }

    const handleCancel = () => {
        setCourses(snapshot)
        setEditing(false);
    }

    const handleSave = () => {
        const cleanCourses = courses
            .map((course, index) => normalizeCourse(course, index))
            .filter((course) => course.code.trim())
            .slice(0, 12)

        if (cleanCourses.length < 9) return

        setCourses(cleanCourses)
        setSnapshot(cleanCourses)
        onUserUpdate?.({ courses: cleanCourses })
        setEditing(false)
    }

    const handleRemove = (index) => {
        if(courses.length <= 9) return;
        setCourses(courses.filter((_, i) => i !== index))
    }

    const handleAdd = () => {
        if(courses.length >= 12) return;
        setCourses([...courses, { code: `COURSE ${courses.length + 1}`, name: 'New course'}])
    }

    const handleUpdate = (index, field, value) => {
        setCourses((currentCourses) =>
            currentCourses.map((course, i) =>
                i === index ? { ...course, [field]: value } : course
            )
        )
    }

    return(
        <main>
            <PersonalDetailsPage/>
            <CourseHeader
                total={courses.length}
                onEdit={handleEdit}
                onSave={handleSave}
                editing={editing}
                onCancel={handleCancel}
            />
            <StatBar
                total={courses.length}
            />
            <CourseGrid
                courses={courses}
                editing={editing}
                onRemove={handleRemove}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
            />
            <div className="mt-8 pt-6 border-t border-[#3D0A4F]/6">
                <p className="text-xs text-[#3D0A4F]/40">
                You can register between 9 and 12 courses per session. Click edit courses to update your list.
                </p>
            </div>
        </main>
    )
}
export default RegisteredCourseList
