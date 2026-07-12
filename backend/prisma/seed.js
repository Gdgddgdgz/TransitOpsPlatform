import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// ─── Helpers ────────────────────────────────────────────────────────────────

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Starting seed...");

  // ── 1. Require an existing Organisation + Admin User ──────────────────────
  // The seed only adds non-user entities. It attaches them to the first
  // organisation it finds (created via /admin/setup in the app).
  const org = await prisma.organization.findFirst();
  if (!org) {
    console.error(
      "❌  No organisation found. Please visit http://localhost:3000/admin/setup first."
    );
    process.exit(1);
  }

  const adminUser = await prisma.user.findFirst({
    where: { organizationId: org.id, role: "ADMIN" },
  });
  if (!adminUser) {
    console.error("❌  No ADMIN user found in the organisation.");
    process.exit(1);
  }

  console.log(`✅  Found org: "${org.name}" — seeding against it`);

  // ── 2. Vehicles (10) ──────────────────────────────────────────────────────
  const vehicleData = [
    { reg: "MH01AB1234", model: "Tata Prima 4028.S", type: "Heavy Truck",    capacity: 28000, odo: 124500, cost: 4200000, status: "AVAILABLE", region: "Mumbai" },
    { reg: "MH02CD5678", model: "Ashok Leyland 2518", type: "Medium Truck",  capacity: 18000, odo: 87300,  cost: 2800000, status: "ON_TRIP",   region: "Pune" },
    { reg: "DL01EF9012", model: "Eicher Pro 6028",    type: "Heavy Truck",   capacity: 25000, odo: 201000, cost: 3900000, status: "IN_SHOP",   region: "Delhi" },
    { reg: "KA03GH3456", model: "BharatBenz 2823R",   type: "Heavy Truck",   capacity: 23000, odo: 54200,  cost: 4100000, status: "AVAILABLE", region: "Bengaluru" },
    { reg: "GJ05IJ7890", model: "Mahindra Furio 14",  type: "Light Truck",   capacity: 14000, odo: 33800,  cost: 1600000, status: "AVAILABLE", region: "Ahmedabad" },
    { reg: "TN07KL2345", model: "Tata Ace Gold",      type: "Mini Truck",    capacity: 1000,  odo: 68000,  cost: 750000,  status: "AVAILABLE", region: "Chennai" },
    { reg: "RJ09MN6789", model: "Ashok Leyland Dost", type: "Light Truck",   capacity: 1250,  odo: 47100,  cost: 820000,  status: "RETIRED",   region: "Jaipur" },
    { reg: "UP11OP1234", model: "Volvo FH16",         type: "Heavy Truck",   capacity: 32000, odo: 310000, cost: 8500000, status: "AVAILABLE", region: "Lucknow" },
    { reg: "TS13QR5678", model: "Scania R500",        type: "Heavy Truck",   capacity: 30000, odo: 260000, cost: 7800000, status: "ON_TRIP",   region: "Hyderabad" },
    { reg: "WB15ST9012", model: "Tata LPT 2518",      type: "Medium Truck",  capacity: 16000, odo: 95000,  cost: 2500000, status: "AVAILABLE", region: "Kolkata" },
  ];

  const vehicles = [];
  for (const v of vehicleData) {
    const vehicle = await prisma.vehicle.upsert({
      where: { registrationNumber: v.reg },
      update: {},
      create: {
        organizationId:     org.id,
        registrationNumber: v.reg,
        model:              v.model,
        type:               v.type,
        maxLoadCapacity:    v.capacity,
        odometer:           v.odo,
        acquisitionCost:    v.cost,
        status:             v.status,
        region:             v.region,
      },
    });
    vehicles.push(vehicle);
  }
  console.log(`✅  Vehicles seeded: ${vehicles.length}`);

  // ── 3. Driver Users + Drivers (8) ─────────────────────────────────────────
  const driverData = [
    { name: "Ramesh Kumar",   email: "ramesh.kumar@transitops.dev",   license: "MH0120241001", cat: "HMV", expiry: "2027-06-30", contact: "+919812340001", score: 92, status: "AVAILABLE" },
    { name: "Suresh Patel",   email: "suresh.patel@transitops.dev",   license: "GJ0520240202", cat: "HMV", expiry: "2026-03-15", contact: "+919812340002", score: 78, status: "ON_TRIP" },
    { name: "Ajay Singh",     email: "ajay.singh@transitops.dev",     license: "DL0120230303", cat: "LMV", expiry: "2025-11-20", contact: "+919812340003", score: 85, status: "AVAILABLE" },
    { name: "Vikram Yadav",   email: "vikram.yadav@transitops.dev",   license: "UP1120241404", cat: "HMV", expiry: "2028-01-10", contact: "+919812340004", score: 96, status: "AVAILABLE" },
    { name: "Dinesh Sharma",  email: "dinesh.sharma@transitops.dev",  license: "RJ0920240505", cat: "HMV", expiry: "2026-08-22", contact: "+919812340005", score: 71, status: "OFF_DUTY" },
    { name: "Manoj Tiwari",   email: "manoj.tiwari@transitops.dev",   license: "TN0720251606", cat: "HMV", expiry: "2029-04-18", contact: "+919812340006", score: 88, status: "AVAILABLE" },
    { name: "Ravi Verma",     email: "ravi.verma@transitops.dev",     license: "KA0320240707", cat: "LMV", expiry: "2026-12-31", contact: "+919812340007", score: 60, status: "SUSPENDED" },
    { name: "Ganesh Reddy",   email: "ganesh.reddy@transitops.dev",   license: "TS1320240808", cat: "HMV", expiry: "2027-09-05", contact: "+919812340008", score: 90, status: "ON_TRIP" },
  ];

  const drivers = [];
  for (const d of driverData) {
    // Upsert the User row (role=DRIVER, inactive until they accept invite)
    const user = await prisma.user.upsert({
      where: { email: d.email },
      update: {},
      create: {
        organizationId: org.id,
        name:           d.name,
        email:          d.email,
        role:           "DRIVER",
        isActive:       true,
        clerkUserId:    `seed_${d.license}`,
      },
    });

    // Upsert the Driver profile linked to that user
    const driver = await prisma.driver.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        organizationId:  org.id,
        userId:          user.id,
        licenseNumber:   d.license,
        licenseCategory: d.cat,
        licenseExpiry:   new Date(d.expiry),
        contactNumber:   d.contact,
        safetyScore:     d.score,
        status:          d.status,
      },
    });
    drivers.push(driver);
  }
  console.log(`✅  Drivers seeded: ${drivers.length}`);

  // ── 4. Trips (12) ─────────────────────────────────────────────────────────
  const tripData = [
    { num: "TRP-2025-001", src: "Mumbai",     dst: "Pune",        weight: 8500,  dist: 150,  actual: 152,  rev: 28000,  status: "COMPLETED",  pStart: daysAgo(30), pEnd: daysAgo(29), dispAt: daysAgo(30), compAt: daysAgo(29), vIdx: 0, dIdx: 0 },
    { num: "TRP-2025-002", src: "Delhi",      dst: "Jaipur",      weight: 12000, dist: 282,  actual: 290,  rev: 45000,  status: "COMPLETED",  pStart: daysAgo(25), pEnd: daysAgo(24), dispAt: daysAgo(25), compAt: daysAgo(24), vIdx: 2, dIdx: 2 },
    { num: "TRP-2025-003", src: "Bengaluru",  dst: "Chennai",     weight: 6000,  dist: 346,  actual: 351,  rev: 52000,  status: "COMPLETED",  pStart: daysAgo(20), pEnd: daysAgo(19), dispAt: daysAgo(20), compAt: daysAgo(19), vIdx: 3, dIdx: 3 },
    { num: "TRP-2025-004", src: "Ahmedabad",  dst: "Mumbai",      weight: 9000,  dist: 524,  actual: 530,  rev: 75000,  status: "COMPLETED",  pStart: daysAgo(18), pEnd: daysAgo(16), dispAt: daysAgo(18), compAt: daysAgo(16), vIdx: 4, dIdx: 1 },
    { num: "TRP-2025-005", src: "Hyderabad",  dst: "Bengaluru",   weight: 15000, dist: 568,  actual: 572,  rev: 90000,  status: "COMPLETED",  pStart: daysAgo(15), pEnd: daysAgo(13), dispAt: daysAgo(15), compAt: daysAgo(13), vIdx: 8, dIdx: 7 },
    { num: "TRP-2025-006", src: "Lucknow",    dst: "Delhi",       weight: 22000, dist: 558,  actual: null, rev: 88000,  status: "DISPATCHED", pStart: daysAgo(3),  pEnd: daysFromNow(1), dispAt: daysAgo(3), compAt: null, vIdx: 7, dIdx: 3 },
    { num: "TRP-2025-007", src: "Kolkata",    dst: "Patna",       weight: 11000, dist: 530,  actual: null, rev: 70000,  status: "DISPATCHED", pStart: daysAgo(2),  pEnd: daysFromNow(1), dispAt: daysAgo(2), compAt: null, vIdx: 9, dIdx: 0 },
    { num: "TRP-2025-008", src: "Chennai",    dst: "Coimbatore",  weight: 7500,  dist: 213,  actual: null, rev: 32000,  status: "DRAFT",      pStart: daysFromNow(2), pEnd: daysFromNow(3), dispAt: null, compAt: null, vIdx: 5, dIdx: 5 },
    { num: "TRP-2025-009", src: "Pune",       dst: "Nagpur",      weight: 18000, dist: 700,  actual: null, rev: 110000, status: "DRAFT",      pStart: daysFromNow(4), pEnd: daysFromNow(6), dispAt: null, compAt: null, vIdx: 1, dIdx: 4 },
    { num: "TRP-2025-010", src: "Delhi",      dst: "Chandigarh",  weight: 5000,  dist: 243,  actual: 248,  rev: 38000,  status: "COMPLETED",  pStart: daysAgo(10), pEnd: daysAgo(9), dispAt: daysAgo(10), compAt: daysAgo(9), vIdx: 2, dIdx: 6 },
    { num: "TRP-2025-011", src: "Jaipur",     dst: "Ahmedabad",   weight: 13500, dist: 658,  actual: null, rev: 95000,  status: "CANCELLED",  pStart: daysAgo(8),  pEnd: daysAgo(6), dispAt: null, compAt: null, vIdx: 4, dIdx: 2 },
    { num: "TRP-2025-012", src: "Mumbai",     dst: "Hyderabad",   weight: 20000, dist: 710,  actual: 718,  rev: 125000, status: "COMPLETED",  pStart: daysAgo(5),  pEnd: daysAgo(3), dispAt: daysAgo(5), compAt: daysAgo(3), vIdx: 0, dIdx: 7 },
  ];

  const trips = [];
  for (const t of tripData) {
    const trip = await prisma.trip.upsert({
      where: { tripNumber: t.num },
      update: {},
      create: {
        organizationId:  org.id,
        tripNumber:      t.num,
        vehicleId:       vehicles[t.vIdx].id,
        driverId:        drivers[t.dIdx].id,
        createdById:     adminUser.id,
        source:          t.src,
        destination:     t.dst,
        cargoWeight:     t.weight,
        plannedDistance: t.dist,
        actualDistance:  t.actual,
        revenue:         t.rev,
        status:          t.status,
        plannedStart:    t.pStart,
        plannedEnd:      t.pEnd,
        dispatchedAt:    t.dispAt,
        completedAt:     t.compAt,
        startOdometer:   vehicles[t.vIdx].odometer,
        endOdometer:     t.actual ? Number(vehicles[t.vIdx].odometer) + t.actual : null,
      },
    });
    trips.push(trip);
  }
  console.log(`✅  Trips seeded: ${trips.length}`);

  // ── 5. Maintenance Logs (8) ───────────────────────────────────────────────
  const maintenanceData = [
    { title: "Engine Oil Change",        desc: "Replaced engine oil and filter after 10,000 km service",    cost: 8500,  status: "CLOSED", openAt: daysAgo(40), closeAt: daysAgo(38), vIdx: 0 },
    { title: "Brake Pad Replacement",    desc: "Front and rear brake pads worn below safe threshold",        cost: 22000, status: "CLOSED", openAt: daysAgo(35), closeAt: daysAgo(33), vIdx: 2 },
    { title: "Tyre Rotation & Balancing",desc: "All 6 tyres rotated and balanced, pressure normalised",     cost: 4200,  status: "CLOSED", openAt: daysAgo(25), closeAt: daysAgo(24), vIdx: 3 },
    { title: "Radiator Flush",           desc: "Coolant flushed and replaced — overheating reported",        cost: 6500,  status: "OPEN",   openAt: daysAgo(10), closeAt: null,        vIdx: 1 },
    { title: "Alternator Failure",       desc: "Alternator seized — vehicle towed to workshop",              cost: 38000, status: "OPEN",   openAt: daysAgo(7),  closeAt: null,        vIdx: 2 },
    { title: "Air Filter Replacement",   desc: "Clogged air filter causing fuel inefficiency",               cost: 3200,  status: "CLOSED", openAt: daysAgo(20), closeAt: daysAgo(19), vIdx: 4 },
    { title: "Suspension Repair",        desc: "Rear leaf spring cracked — replaced with OEM parts",         cost: 45000, status: "CLOSED", openAt: daysAgo(50), closeAt: daysAgo(46), vIdx: 7 },
    { title: "Transmission Fluid Change",desc: "Gearbox fluid dark and burnt — full flush done",            cost: 11000, status: "OPEN",   openAt: daysAgo(3),  closeAt: null,        vIdx: 8 },
  ];

  for (const m of maintenanceData) {
    await prisma.maintenanceLog.create({
      data: {
        organizationId: org.id,
        vehicleId:      vehicles[m.vIdx].id,
        createdById:    adminUser.id,
        closedById:     m.status === "CLOSED" ? adminUser.id : null,
        title:          m.title,
        description:    m.desc,
        cost:           m.cost,
        status:         m.status,
        openedAt:       m.openAt,
        closedAt:       m.closeAt,
      },
    });
  }
  console.log(`✅  Maintenance logs seeded: ${maintenanceData.length}`);

  // ── 6. Fuel Logs (10) ─────────────────────────────────────────────────────
  const fuelData = [
    { liters: 320, cost: 38400, date: daysAgo(28), vIdx: 0, tIdx: 0 },
    { liters: 480, cost: 57600, date: daysAgo(23), vIdx: 2, tIdx: 1 },
    { liters: 250, cost: 30000, date: daysAgo(18), vIdx: 3, tIdx: 2 },
    { liters: 410, cost: 49200, date: daysAgo(16), vIdx: 4, tIdx: 3 },
    { liters: 530, cost: 63600, date: daysAgo(13), vIdx: 8, tIdx: 4 },
    { liters: 195, cost: 23400, date: daysAgo(9),  vIdx: 2, tIdx: 9  },
    { liters: 380, cost: 45600, date: daysAgo(3),  vIdx: 7, tIdx: 5  },
    { liters: 445, cost: 53400, date: daysAgo(2),  vIdx: 9, tIdx: 6  },
    { liters: 160, cost: 19200, date: daysAgo(4),  vIdx: 0, tIdx: 11 },
    { liters: 300, cost: 36000, date: daysAgo(5),  vIdx: 5, tIdx: null },
  ];

  for (const f of fuelData) {
    await prisma.fuelLog.create({
      data: {
        organizationId: org.id,
        vehicleId:      vehicles[f.vIdx].id,
        tripId:         f.tIdx !== null ? trips[f.tIdx].id : null,
        createdById:    adminUser.id,
        liters:         f.liters,
        cost:           f.cost,
        fuelDate:       f.date,
      },
    });
  }
  console.log(`✅  Fuel logs seeded: ${fuelData.length}`);

  // ── 7. Expenses (12) ──────────────────────────────────────────────────────
  const expenseData = [
    { cat: "TOLL",      amount: 3200,  desc: "NH-48 toll charges — Mumbai to Pune",          date: daysAgo(29), vIdx: 0,    tIdx: 0 },
    { cat: "TOLL",      amount: 5600,  desc: "Expressway toll — Delhi to Jaipur",             date: daysAgo(24), vIdx: 2,    tIdx: 1 },
    { cat: "REPAIR",    amount: 22000, desc: "Brake pad replacement — urgent workshop visit", date: daysAgo(33), vIdx: 2,    tIdx: null },
    { cat: "INSURANCE", amount: 185000,desc: "Annual comprehensive insurance premium",         date: daysAgo(60), vIdx: 0,    tIdx: null },
    { cat: "INSURANCE", amount: 142000,desc: "Annual comprehensive insurance premium",         date: daysAgo(58), vIdx: 7,    tIdx: null },
    { cat: "TOLL",      amount: 4100,  desc: "State highway toll — Bengaluru to Chennai",     date: daysAgo(19), vIdx: 3,    tIdx: 2 },
    { cat: "REPAIR",    amount: 8500,  desc: "Engine oil service at authorised workshop",     date: daysAgo(38), vIdx: 0,    tIdx: null },
    { cat: "OTHER",     amount: 2500,  desc: "Driver refreshment and rest-stop expenses",     date: daysAgo(13), vIdx: 8,    tIdx: 4 },
    { cat: "TOLL",      amount: 6800,  desc: "Yamuna Expressway toll — Lucknow to Delhi",     date: daysAgo(3),  vIdx: 7,    tIdx: 5 },
    { cat: "REPAIR",    amount: 45000, desc: "Suspension leaf spring — OEM replacement",      date: daysAgo(46), vIdx: 7,    tIdx: null },
    { cat: "OTHER",     amount: 1800,  desc: "Overweight permit fee at state checkpoint",     date: daysAgo(5),  vIdx: 0,    tIdx: 11 },
    { cat: "TOLL",      amount: 3900,  desc: "Outer Ring Road tolls — Hyderabad to Bengaluru",date: daysAgo(12), vIdx: 8,    tIdx: 4 },
  ];

  for (const e of expenseData) {
    await prisma.expense.create({
      data: {
        organizationId: org.id,
        vehicleId:      vehicles[e.vIdx].id,
        tripId:         e.tIdx !== null ? trips[e.tIdx].id : null,
        createdById:    adminUser.id,
        category:       e.cat,
        amount:         e.amount,
        description:    e.desc,
        expenseDate:    e.date,
      },
    });
  }
  console.log(`✅  Expenses seeded: ${expenseData.length}`);

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log("\n🎉  Seed complete!");
  console.log(`    Vehicles:          ${vehicles.length}`);
  console.log(`    Drivers:           ${drivers.length}`);
  console.log(`    Trips:             ${trips.length}`);
  console.log(`    Maintenance logs:  ${maintenanceData.length}`);
  console.log(`    Fuel logs:         ${fuelData.length}`);
  console.log(`    Expenses:          ${expenseData.length}`);
  console.log(`    Total records:     ${vehicles.length + drivers.length + trips.length + maintenanceData.length + fuelData.length + expenseData.length}`);
}

main()
  .catch((e) => {
    console.error("❌  Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
