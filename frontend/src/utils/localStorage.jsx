const employees = [
  {
    "id": 1,
    "email": "john.doe@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Prepare project report",
        "description": "Compile Q3 project updates and insights.",
        "date": "2025-08-01",
        "category": "Reporting",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Client meeting",
        "description": "Discuss upcoming deliverables with Acme Corp.",
        "date": "2025-08-03",
        "category": "Meetings",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Update CRM records",
        "description": "Ensure client data is up-to-date.",
        "date": "2025-08-02",
        "category": "Admin",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  },
  {
    "id": 2,
    "email": "jane.smith@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Team stand-up",
        "description": "Daily sync with the development team.",
        "date": "2025-08-08",
        "category": "Meetings",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Bug fixing sprint",
        "description": "Fix reported bugs in module A.",
        "date": "2025-08-05",
        "category": "Development",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      }
    ]
  },
  {
    "id": 3,
    "email": "alice.williams@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "UI redesign",
        "description": "Work on landing page mockups.",
        "date": "2025-08-04",
        "category": "Design",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Feedback session",
        "description": "Gather design feedback from stakeholders.",
        "date": "2025-08-06",
        "category": "Design",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Font audit",
        "description": "Standardize fonts across all UI screens.",
        "date": "2025-08-07",
        "category": "Design",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  },
  {
    "id": 4,
    "email": "michael.brown@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Deploy backend services",
        "description": "Deploy services to production.",
        "date": "2025-08-02",
        "category": "DevOps",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Monitor system logs",
        "description": "Check logs for any anomalies post-deployment.",
        "date": "2025-08-03",
        "category": "DevOps",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      }
    ]
  },
  {
    "id": 5,
    "email": "emma.jones@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Create training material",
        "description": "Prepare onboarding documentation.",
        "date": "2025-08-06",
        "category": "HR",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Schedule interviews",
        "description": "Arrange interviews for frontend role.",
        "date": "2025-08-08",
        "category": "HR",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Policy review",
        "description": "Review remote work policies.",
        "date": "2025-08-05",
        "category": "HR",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  }
];

const admin = [
  {
    "id": 1,
    "email": "admin@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "System audit",
        "description": "Audit security policies and access logs.",
        "date": "2025-08-01",
        "category": "Security",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Approve budget",
        "description": "Review and approve Q4 budget allocations.",
        "date": "2025-08-04",
        "category": "Finance",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Board meeting",
        "description": "Present strategic updates to the board.",
        "date": "2025-08-07",
        "category": "Management",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      }
    ]
  }
];

export const setLocalStorage = (employees, admin) => {
    console.log('Setting local storage');
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('admin', JSON.stringify(admin));
}

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    return {employees, admin};
}

