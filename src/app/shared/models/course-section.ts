export class CourseSection {
    id!: string;
    courseId!: string;
    name!: string;
    description!: string;
    sortOrder!: number;
    isActive?: boolean;
}