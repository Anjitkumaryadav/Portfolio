import { motion } from "motion/react";
import { Users, LayoutGrid, CalendarCheck, ShieldCheck, Settings, LogOut } from "lucide-react";
import BrowserChrome from "./BrowserChrome";

const EASE = [0.16, 1, 0.3, 1];

const NAV = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: Users, label: "Employees" },
  { icon: CalendarCheck, label: "Attendance" },
  { icon: ShieldCheck, label: "Roles" },
  { icon: Settings, label: "Settings" },
];

const EMPLOYEES = [
  { name: "P. Sharma", role: "Admin", tag: "signal", status: "Active" },
  { name: "R. Verma", role: "Manager", tag: "data", status: "Active" },
  { name: "S. Gupta", role: "Employee", tag: "dim", status: "On leave" },
  { name: "A. Khan", role: "Employee", tag: "dim", status: "Active" },
];

const BARS = [40, 62, 48, 78, 55, 88, 70];

export default function HrmsMockup() {
  return (
    <BrowserChrome url="hrms.internal / dashboard">
      <div className="grid grid-cols-[132px_1fr] text-ink">
        {/* Sidebar */}
        <aside className="flex flex-col gap-1 border-r border-line bg-void/40 p-3">
          <div className="mb-3 flex items-center gap-2 px-1 font-mono text-[10px] uppercase tracking-meta text-ink-dim">
            <span className="h-1.5 w-1.5 bg-signal" /> HRMS
          </div>
          {NAV.map((n) => (
            <div
              key={n.label}
              className={`flex items-center gap-2 rounded-[3px] px-2 py-1.5 font-mono text-[10px] tracking-meta ${
                n.active ? "bg-signal-dim text-signal" : "text-ink-dim"
              }`}
            >
              <n.icon size={12} strokeWidth={1.75} />
              <span className="truncate">{n.label}</span>
            </div>
          ))}
          <div className="mt-auto flex items-center gap-2 px-2 py-1.5 font-mono text-[10px] tracking-meta text-ink-faint">
            <LogOut size={12} strokeWidth={1.75} /> Logout
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 p-4 sm:p-5">
          {/* Stat row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "Employees", v: "128" },
              { k: "Present", v: "112" },
              { k: "On leave", v: "9" },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                className="rounded-[4px] border border-line p-2.5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              >
                <div className="font-display text-lg font-medium leading-none text-ink">
                  {s.v}
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-meta text-ink-dim">
                  {s.k}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="mt-4 rounded-[4px] border border-line p-3">
            <div className="mb-2 font-mono text-[9px] uppercase tracking-meta text-ink-dim">
              Attendance · this week
            </div>
            <div className="flex h-16 items-end gap-1.5">
              {BARS.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-[2px] bg-gradient-to-t from-signal/30 to-signal"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.05 }}
                />
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 overflow-hidden rounded-[4px] border border-line">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-line bg-void/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-meta text-ink-faint">
              <span>Employee</span>
              <span>Role</span>
              <span>Status</span>
            </div>
            {EMPLOYEES.map((e, i) => (
              <motion.div
                key={e.name}
                className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-line px-3 py-2 last:border-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.07 }}
              >
                <span className="flex items-center gap-2 font-mono text-[10px] text-ink">
                  <span className="h-4 w-4 rounded-full bg-line-strong" />
                  {e.name}
                </span>
                <span>
                  <span
                    className={`inline-block rounded-[2px] px-1.5 py-0.5 font-mono text-[9px] tracking-meta ${
                      e.tag === "signal"
                        ? "bg-signal-dim text-signal"
                        : e.tag === "data"
                        ? "bg-data/15 text-data"
                        : "bg-line text-ink-dim"
                    }`}
                  >
                    {e.role}
                  </span>
                </span>
                <span className="font-mono text-[9px] tracking-meta text-ink-dim">
                  {e.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}
