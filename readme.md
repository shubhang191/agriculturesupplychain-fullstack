# 🌾 Agriculture Supply Chain Management System

A full-stack enterprise web application designed to track, monitor, and streamline agricultural logistics—from raw harvests and regional co-ops to storage, shipments, and distribution network partners.

## 🚀 Overview

This platform provides real-time oversight of end-to-end agricultural supply chain operations. It combines an enterprise-grade **Spring Boot** backend for scalable data management with a modern, dynamic **React** dashboard for rapid data visualization and CRUD management.

### Key Capabilities

* **Domain Operations (8 Managed Entities):** Complete data lifecycle management for Farmers, Agricultural Fields, Crop Batches, Regional Co-ops, Storage Facilities, Shipments, Suppliers, and Buyers.

* **Real-Time Analytics Dashboard:** Visual metric cards, shipment activity trackers, and recent harvest feeds.

* **Dynamic CRUD UI:** Interactive modal forms, contextual status badges, relational record linking, and confirmation dialogs.

* **RESTful API Layer:** Modularized Spring Boot controllers backed by Spring Data JPA and automated persistence.

## 🛠️ Tech Stack

### **Backend**

* **Framework:** Java 17+, Spring Boot 3

* **Data Access:** Spring Data JPA / Hibernate

* **Build Tool:** Apache Maven (`mvnw` wrapper)

* **Architecture:** Controller-Service-Repository pattern with REST endpoints

### **Frontend**

* **Framework:** React 18 (Vite)

* **Styling:** Tailwind CSS

* **HTTP Client:** Axios (Centralized API service architecture)

* **Icons:** Lucide React

## 📁 Repository Structure

```
agriculturesupplychain-fullstack/
├── Backend/                 # Spring Boot REST API
│   ├── src/                 # Controllers, Services, Entities & Repositories
│   ├── pom.xml              # Maven dependencies
│   └── mvnw                 # Maven wrapper executable
└── Frontend/                # React + Vite UI
    ├── src/                 # Components, Pages, and Axios API Service
    ├── package.json         # Dependencies & scripts
    └── vite.config.js       # Vite configuration

```

## ⚡ Quick Start & Local Setup

### Prerequisites

* **Java Development Kit (JDK 17 or higher)**

* **Node.js (v18 or higher) & npm**

### 1. Backend Setup (Spring Boot)

```
# Navigate to Backend folder
cd Backend

# Build and run using the Maven wrapper
./mvnw spring-boot:run

```

> The API server will start on `http://localhost:8080`.

### 2. Frontend Setup (React + Vite)

```
# Open a new terminal and navigate to Frontend folder
cd Frontend

# Install packages
npm install

# Start the Vite development server
npm run dev

```

> The web interface will run on `http://localhost:5173`.

## 🔗 API Architecture

The frontend communicates with the Spring Boot backend via a centralized Axios layer (`src/services/api.js`) targeting the following endpoints:

| Domain | Base Endpoint | Key Operations | 
 | ----- | ----- | ----- | 
| **Farmers** | `/api/farmers` | GET, POST, PUT, DELETE | 
| **Fields** | `/api/fields` | GET, POST, PUT, DELETE | 
| **Crop Batches** | `/api/batches` | GET, POST, PUT, DELETE | 
| **Shipments** | `/api/shipments` | GET, POST, PUT, DELETE | 
| **Regional Co-ops** | `/api/coops` | GET, POST, PUT, DELETE | 
| **Storage Facilities** | `/api/storage` | GET, POST, PUT, DELETE | 
| **Suppliers** | `/api/suppliers` | GET, POST, PUT, DELETE | 
| **Buyers** | `/api/buyers` | GET, POST, PUT, DELETE | 

## 📄 License

This project is licensed under the [MIT License](LICENSE).