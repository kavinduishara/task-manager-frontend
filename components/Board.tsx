import { time } from "console"
import Column from "./Column"

function Board() {
    const columns = [
    {
        id: 1,
        title: "Todo",
        count: 5,
        cards: [
            {
                id: 1,
                title: "Design landing page",
                label: "design",
                description: "Create the initial design for the product landing page.",
                assignee: "John Doe",
                doneAt: null,
            },
            {
                id: 2,
                title: "Set up project repository",
                label: "development",
                description: "Initialize the repository and configure the development environment.",
                assignee: "Jane Smith",
                doneAt: null,
            },
            {
                id: 3,
                title: "Create database schema",
                label: "backend",
                description: "Design the database tables and relationships for the application.",
                assignee: "Mike Johnson",
                doneAt: null,
            },
            {
                id: 4,
                title: "Write API documentation",
                label: "documentation",
                description: "Document all available API endpoints and request formats.",
                assignee: "Sarah Wilson",
                doneAt: null,
            },
            {
                id: 5,
                title: "Set up authentication",
                label: "feature",
                description: "Implement user registration, login, and JWT authentication.",
                assignee: "Alex Brown",
                doneAt: null,
            },
        ],
    },
    {
        id: 2,
        title: "Doing",
        count: 4,
        cards: [
            {
                id: 6,
                title: "Build dashboard UI",
                label: "frontend",
                description: "Implement the main dashboard layout and reusable components.",
                assignee: "John Doe",
                doneAt: null,
            },
            {
                id: 7,
                title: "Implement task management",
                label: "feature",
                description: "Add functionality for creating, editing, and deleting tasks.",
                assignee: "Jane Smith",
                doneAt: null,
            },
            {
                id: 8,
                title: "Configure CI/CD pipeline",
                label: "devops",
                description: "Create a GitHub Actions workflow for automated deployment.",
                assignee: "Mike Johnson",
                doneAt: null,
            },
            {
                id: 9,
                title: "Fix mobile responsiveness",
                label: "bug",
                description: "Improve the dashboard layout for tablet and mobile devices.",
                assignee: "Sarah Wilson",
                doneAt: null,
            },
        ],
    },
    {
        id: 3,
        title: "Done",
        count: 4,
        cards: [
            {
                id: 10,
                title: "Create project structure",
                label: "development",
                description: "Set up the initial project structure and folder organization.",
                assignee: "John Doe",
                doneAt: new Date(2026, 7, 28, 10, 30),
            },
            {
                id: 11,
                title: "Configure database",
                label: "backend",
                description: "Connect the application to the PostgreSQL database.",
                assignee: "Jane Smith",
                doneAt: new Date(2026, 7, 29, 14, 15),
            },
            {
                id: 12,
                title: "Create login page",
                label: "frontend",
                description: "Build the login form and connect it to the authentication API.",
                assignee: "Mike Johnson",
                doneAt: new Date(2026, 7, 30, 11, 45),
            },
            {
                id: 13,
                title: "Set up Docker",
                label: "devops",
                description: "Containerize the application using Docker.",
                assignee: "Sarah Wilson",
                doneAt: new Date(2026, 7, 31, 16, 20),
            },
        ],
    },
];

    return (
        <div className="flex gap-4">
            {columns.map((column) => (
                <Column key={column.id} title={column.title} count={column.count} cards={column.cards} />
            ))}
        </div>
    )
}

export default Board