# GP Digital Queue Management System Frontend

### Live Version
Hosted version available here:  
- [GP Digital Queue Management System](https://digital-queue-management.netlify.app/)

---

## 📌 Project Summary

Digital Queue Management System is a responsive frontend application to replace traditional UK GP phone queues with a real-time digital queue system. Patients can join a virtual queue, track their position and estimated waiting time, and receive updates without waiting on hold. Receptionists can manage the queue live through a dashboard. The application connects to the dedicated backend API and WebSocket server [(GP Digital Queue System Backend)](https://github.com/hasnaindar8/digital-queue-management-be) to provide live queue updates and seamless communication.

### Problem Statement

UK GP practices often rely on phone-based appointment systems where:

Patients wait 20–45 minutes on hold

Phone lines are overloaded at peak hours

Receptionists are overwhelmed by repeated calls

Patients miss appointments or give up trying to contact their GP

### Solution

This project introduces a Digital Queue System that allows:

Patients to join a queue online

Real-time updates on queue position and ETA

Receptionists to manage requests efficiently

Reduced phone congestion and staff stress

**Phone queue = waiting on hold**  
**Digital queue = waiting without calling**

✅ Current supported functionality includes:

### Patient

- Join GP queue digitally

- Select reason for contact (UK GP-specific reasons)

- View live queue position

- See estimated waiting time (ETA)

- Receive real-time updates via WebSockets

### Receptionist

- Live dashboard showing queue

- View patient details and reasons

- Mark patients as served

- Queue updates broadcast instantly

## Tech Stack

| Feature | Details |
|--------|---------|
| Framework | Next.js (JavaScript) |
| Library | React |
| Language | JavaScript |
| Styling | Tailwind CSS |
| Routing | Next.js App Router |
| HTTP Requests | Fetch |
| Real-Time Communication | Socket.IO |
| State Management | React Hooks |

---

## Getting Started Locally

Follow these steps to setup the project on your machine.

### ✅ 1. Clone the repository

Clone the repository:

```bash
git clone https://github.com/hasnaindar8/digital-queue-management-fe.git
cd digital-queue-management-fe
```

### ✅ 2. Install dependencies

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

```bash
pnpm install
```
### ✅ 3. Start the server

```bash
pnpm run dev
```
Server should be running at:

```
http://localhost:3000/
```
---

## Minimum Requirements

| Dependency | Version |
|-----------|---------|
| Node.js | **v18.x or higher recommended** |
| pnpm | **v10.x or higher recommended** |

Check your versions:

```bash
node -v
pnpm -v
```
## Contributions

Contributions are welcome! Please open an issue or submit a pull request with a clear description of your changes.
