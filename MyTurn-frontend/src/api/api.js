const BASE_URL = "http://localhost:8080";

// ================= USER =================

export async function createTicket(payload) {
  const res = await fetch(`${BASE_URL}/api/checkin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create ticket");
  }

  return res.json();
}

// Queue Stats
export async function getQueueStats({ orgType, orgName, serviceId }) {
  const res = await fetch(
    `${BASE_URL}/api/stats?orgType=${orgType}&orgName=${encodeURIComponent(
      orgName
    )}&serviceId=${serviceId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch stats");
  }

  return res.json();
}

// ================= ADMIN =================

export async function getWaitingTickets() {
  return (await fetch(`${BASE_URL}/api/admin/waiting`)).json();
}

export async function getActiveTickets() {
  return (await fetch(`${BASE_URL}/api/admin/active`)).json();
}

export async function getCompletedTickets() {
  return (await fetch(`${BASE_URL}/api/admin/completed`)).json();
}

export async function completeTicket(id) {
  await fetch(`${BASE_URL}/api/admin/complete/${id}`, {
    method: "POST",
  });
}

export async function getAdminStats() {
  return (await fetch(`${BASE_URL}/api/admin/stats`)).json();
}