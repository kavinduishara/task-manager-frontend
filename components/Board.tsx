"use client"
import {DragDropProvider} from '@dnd-kit/react';
import Column from "./Column"
import { useState } from 'react';

function Board() {
    const [columnData, setColumnData] = useState([
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
                dueDate: null,
            },
            {
                id: 2,
                title: "Set up project repository",
                label: "development",
                description: "Initialize the repository and configure the development environment.",
                assignee: "Jane Smith",
                dueDate: null,
            },
            {
                id: 3,
                title: "Create database schema",
                label: "backend",
                description: "Design the database tables and relationships for the application.",
                assignee: "Mike Johnson",
                dueDate: null,
            },
            {
                id: 4,
                title: "Write API documentation",
                label: "documentation",
                description: "Document all available API endpoints and request formats.",
                assignee: "Sarah Wilson",
                dueDate: null,
            },
            {
                id: 5,
                title: "Set up authentication",
                label: "feature",
                description: "Implement user registration, login, and JWT authentication.",
                assignee: "Alex Brown",
                dueDate: null,
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
                assignee: { name: "John Doe", profilePicture: "https://randomuser.me/api/portraits/men/1.jpg" },
                dueDate: null,
            },
            {
                id: 7,
                title: "Implement task management",
                label: "feature",
                description: "Add functionality for creating, editing, and deleting tasks.",
                assignee: { name: "Jane Smith", profilePicture: "https://randomuser.me/api/portraits/women/1.jpg" },
                dueDate: null,
            },
            {
                id: 8,
                title: "Configure CI/CD pipeline",
                label: "devops",
                description: "Create a GitHub Actions workflow for automated deployment.",
                assignee: { name: "Mike Johnson", profilePicture: "https://randomuser.me/api/portraits/men/2.jpg" },
                dueDate: null,
            },
            {
                id: 9,
                title: "Fix mobile responsiveness",
                label: "bug",
                description: "Improve the dashboard layout for tablet and mobile devices.",
                assignee: { name: "Sarah Wilson", profilePicture: "https://randomuser.me/api/portraits/women/2.jpg" },
                dueDate: null,
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
                dueDate: new Date(2026, 7, 28, 10, 30),
            },
            {
                id: 11,
                title: "Configure database",
                label: "backend",
                description: "Connect the application to the PostgreSQL database.",
                assignee: "Jane Smith",
                dueDate: new Date(2026, 7, 29, 14, 15),
            },
            {
                id: 12,
                title: "Create login page",
                label: "frontend",
                description: "Build the login form and connect it to the authentication API.",
                assignee: "Mike Johnson",
                dueDate: new Date(2026, 7, 30, 11, 45),
            },
            {
                id: 13,
                title: "Set up Docker",
                label: "devops",
                description: "Containerize the application using Docker.",
                assignee: "Sarah Wilson",
                dueDate: new Date(2026, 7, 31, 16, 20),
            },
        ],
    },
]);

    
    return (
        
        <div className="flex h-full min-h-0 w-full gap-4">
            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;

                    const {target} = event.operation;
                    setColumnData((prevColumns) => {
                        const sourceColumnIndex = prevColumns.findIndex((column) =>
                            column.cards.some((card) => card.id === event.operation.source?.id)
                        );
                        const targetColumnIndex = prevColumns.findIndex((column) => column.id === Number(target?.id));
                        if (sourceColumnIndex === -1 || targetColumnIndex === -1) return prevColumns;

                        const updatedColumns = [...prevColumns];
                        const [movedCard]: any[] = updatedColumns[sourceColumnIndex].cards.splice(
                            updatedColumns[sourceColumnIndex].cards.findIndex((card) => card.id === event.operation.source?.id),
                            1
                        );
                        updatedColumns[targetColumnIndex].cards.push(movedCard);

                        return updatedColumns;
                    });
                }}
            >
                {columnData.map((column) => (
                    <Column 
                        id={column.id} 
                        key={column.id} 
                        title={column.title} 
                        count={column.count} 
                        cards={column.cards}

                    />
                ))}
            </DragDropProvider>
        </div>
    )
}

export default Board