import { useMemo, useState } from "react";
import { motion } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { skillClusters, skillRelations } from "../data/site";
import { usePointerFine } from "../lib/usePointerFine";

const VW = 1000;
const VH = 640;

// Cluster anchors laid out around the canvas.
const ANCHORS = {
  backend: { x: 250, y: 190 },
  frontend: { x: 720, y: 160 },
  database: { x: 500, y: 350 },
  devops: { x: 760, y: 470 },
  testing: { x: 240, y: 470 },
};

function buildLayout() {
  const nodes = {};
  skillClusters.forEach((cluster) => {
    const anchor = ANCHORS[cluster.id];
    const n = cluster.skills.length;
    const radius = 92;
    cluster.skills.forEach((skill, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      // stagger radius a touch so labels don't collide
      const r = radius + (i % 2 === 0 ? 0 : 34);
      nodes[skill] = {
        skill,
        cluster: cluster.id,
        x: anchor.x + Math.cos(angle) * r,
        y: anchor.y + Math.sin(angle) * r,
      };
    });
  });
  return nodes;
}

export default function Skills() {
  const fine = usePointerFine();
  const nodes = useMemo(buildLayout, []);
  const [hover, setHover] = useState(null);

  const relatedOf = useMemo(() => {
    const map = {};
    skillRelations.forEach(([a, b]) => {
      (map[a] ||= new Set()).add(b);
      (map[b] ||= new Set()).add(a);
    });
    return map;
  }, []);

  const isActive = (skill) =>
    !hover || skill === hover || relatedOf[hover]?.has(skill);
  const isActiveEdge = (a, b) =>
    !hover || a === hover || b === hover;

  return (
    <section id="skills" data-section className="frame scroll-mt-20 py-24 sm:py-32">
      <SectionHeader index="04" label="Technical Skills" />

      <Reveal className="mt-12 max-w-3xl">
        <h2 className="font-display text-4xl font-medium uppercase leading-[0.98] tracking-tightest text-ink sm:text-6xl">
          A connected{" "}
          <span className="font-serif italic lowercase text-signal">stack</span>, not a
          checklist.
        </h2>
      </Reveal>

      {/* Desktop: constellation */}
      <Reveal className="mt-14 hidden lg:block" y={30}>
        <div className="relative overflow-hidden rounded-[6px] border border-line bg-surface/40">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="h-auto w-full"
            role="img"
            aria-label="Interactive map of technical skills grouped into backend, frontend, database, devops and testing clusters"
          >
            {/* edges */}
            <g>
              {skillRelations.map(([a, b], i) => {
                const na = nodes[a];
                const nb = nodes[b];
                if (!na || !nb) return null;
                const active = isActiveEdge(a, b);
                return (
                  <line
                    key={i}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke={active ? "rgba(110,139,255,0.5)" : "rgba(255,255,255,0.06)"}
                    strokeWidth={active && hover ? 1.4 : 1}
                    style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                  />
                );
              })}
            </g>

            {/* cluster labels */}
            {skillClusters.map((c) => {
              const a = ANCHORS[c.id];
              return (
                <text
                  key={c.id}
                  x={a.x}
                  y={a.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-mono"
                  fill="rgba(138,144,153,0.5)"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {c.label.toUpperCase()}
                </text>
              );
            })}

            {/* nodes */}
            {Object.values(nodes).map((n) => {
              const active = isActive(n.skill);
              const focused = hover === n.skill;
              return (
                <g
                  key={n.skill}
                  transform={`translate(${n.x},${n.y})`}
                  onMouseEnter={() => setHover(n.skill)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    cursor: "pointer",
                    opacity: active ? 1 : 0.28,
                    transition: "opacity 0.3s",
                  }}
                >
                  <circle
                    r={focused ? 5 : 3.2}
                    fill={focused ? "#D2A15E" : active && hover ? "#D2A15E" : "#F3F4F5"}
                    style={{ transition: "r 0.25s, fill 0.25s" }}
                  />
                  <text
                    x={0}
                    y={-12}
                    textAnchor="middle"
                    fill={focused ? "#F3F4F5" : "#8A9099"}
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.04em",
                      transition: "fill 0.25s",
                    }}
                  >
                    {n.skill}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-meta text-ink-faint">
            {fine ? "Hover a node to trace its connections" : ""}
          </div>
        </div>
      </Reveal>

      {/* Mobile / tablet: grouped lists */}
      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:hidden">
        {skillClusters.map((c) => (
          <div key={c.id} className="bg-void p-6">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-meta text-signal">
              <span className="h-1 w-1 bg-signal" /> {c.label}
            </div>
            <ul className="mt-4 space-y-2">
              {c.skills.map((s, i) => (
                <motion.li
                  key={s}
                  className="font-display text-lg text-ink-dim"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
