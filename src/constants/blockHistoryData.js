export const rows = [
  {
    id: 1,
    patientName: "Alice Johnson",
    phoneNumber: "555-123-4567",
    email: "alice@example.com",
    createDate: "2024-03-28",
    notes: "Scheduled follow-up appointment",
    isActive: true,
  },
  {
    id: 2,
    patientName: "Bob Williams",
    phoneNumber: "555-987-6543",
    email: "bob@example.com",
    createDate: "2024-03-30",
    notes: "Prescription refill requested",
    isActive: false,
  },
  {
    id: 3,
    patientName: "Carol Adams",
    phoneNumber: "555-555-5555",
    email: "carol@example.com",
    createDate: "2024-03-25",
    notes: "Lab test results pending",
    isActive: true,
  },
  {
    id: 4,
    patientName: "David Clark",
    phoneNumber: "555-777-8888",
    email: "david@example.com",
    createDate: "2024-03-29",
    notes: "Insurance claim submitted",
    isActive: false,
  },
  {
    id: 5,
    patientName: "Eva Garcia",
    phoneNumber: "555-222-3333",
    email: "eva@example.com",
    createDate: "2024-03-31",
    notes: "Appointment confirmation sent",
    isActive: true,
  },
];

export const columns = [
  {
    id: "patientName",
    label: "Patient Name",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "createDate",
    label: "Create Date",
  },
  {
    id: "notes",
    label: "Notes",
  },
  {
    id: "isActive",
    label: "isActive",
  },
  {
    id: "action",
    label: "Action",
  },
];
