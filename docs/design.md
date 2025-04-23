# prompt used - design the system architecture in markdown format, include data models and relationships in mermaid format, use details from docs/plan.md

# System Architecture for Electronic Health Record (EHR) System

## Overview:
The EHR system will follow a modular architecture with a clear separation of concerns. The system will consist of the following layers:
1. **Frontend**: A user-friendly interface for healthcare providers to interact with the system.
2. **Backend**: APIs to handle business logic and data processing.
3. **Database**: A relational database to store patient records, appointments, medical history, and treatment plans.

---

## Components:
### 1. **Frontend**:
- Built using a modern JavaScript framework (e.g., React or Angular).
- Handles user interactions and communicates with the backend via RESTful APIs.

### 2. **Backend**:
- Built using a framework like Node.js with Express.
- Implements business logic, authentication, and data validation.
- Provides RESTful APIs for the frontend.

### 3. **Database**:
- A relational database (e.g., PostgreSQL or MySQL) to store structured data.
- Ensures data persistence and supports CRUD operations.

---

## API Endpoints:
### User Authentication:
- POST /api/register: Register a new user.
- POST /api/login: Authenticate a user.

### Patient Management:
- POST /api/patients: Add a new patient.
- GET /api/patients: Retrieve all patients.
- PUT /api/patients/:id: Update a patient record.
- DELETE /api/patients/:id: Delete a patient record.

### Medical History:
- POST /api/patients/:id/medical-history: Add medical history for a patient.
- GET /api/patients/:id/medical-history: Retrieve medical history for a patient.
- PUT /api/medical-history/:id: Update medical history.

### Appointment Scheduling:
- POST /api/patients/:id/appointments: Schedule an appointment.
- GET /api/patients/:id/appointments: Retrieve appointments for a patient.
- PUT /api/appointments/:id: Update an appointment.
- DELETE /api/appointments/:id: Cancel an appointment.

### Treatment Planning:
- POST /api/patients/:id/treatment-plans: Create a treatment plan.
- GET /api/patients/:id/treatment-plans: Retrieve treatment plans for a patient.
- PUT /api/treatment-plans/:id: Update a treatment plan.

## Data Models and Relationships:
The following Mermaid diagram illustrates the data models and their relationships:

```mermaid
erDiagram
    User {
        int id PK
        string username
        string email
        string password_hash
    }
    Patient {
        int id PK
        string name
        int age
        string contact_details
    }
    MedicalHistory {
        int id PK
        int patient_id FK
        string illness
        string surgeries
        string medications
        date updated_at
    }
    Appointment {
        int id PK
        int patient_id FK
        date appointment_date
        string status
    }
    TreatmentPlan {
        int id PK
        int patient_id FK
        string plan_details
        string progress
        date updated_at
    }

    User ||--o{ Patient : "manages"
    Patient ||--o{ MedicalHistory : "has"
    Patient ||--o{ Appointment : "has"
    Patient ||--o{ TreatmentPlan : "has"



