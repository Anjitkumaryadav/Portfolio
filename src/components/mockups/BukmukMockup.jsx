import { useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Search, ShoppingBag, Heart } from "lucide-react";
import BrowserChrome from "./BrowserChrome";

const EASE = [0.16, 1, 0.3, 1];

const CHIPS = ["Ages 6–9", "Adventure", "Picture", "Bestsellers"];
const BOOKS = [
  { t: "The Star", c: "from-[#3a2f5b] to-[#221a3a]" },
  { t: "Wild Woods", c: "from-[#1f4033] to-[#14261f]" },
  { t: "Blue Moon", c: "from-[#1e3350] to-[#141f30]" },
  { t: "Red Kite", c: "from-[#4a2620] to-[#2a1613]" },
  { t: "Tiny Seed", c: "from-[#3f3a1c] to-[#242112]" },
  { t: "Cloud Nine", c: "from-[#2c3a4a] to-[#1a222c]" },
];

function BagCounter({ inView }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let c = 0;
    const id = setInterval(() => {
      c += 1;
      setN(c);
      if (c >= 3) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <span className="relative">
      <ShoppingBag size={13} strokeWidth={1.75} />
      <span className="absolute -right-2 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-signal font-mono text-[8px] text-void">
        {n}
      </span>
    </span>
  );
}

export default function BukmukMockup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref}>
      <BrowserChrome url="bukmuk.com / discover">
        <div className="text-ink">
          {/* Topbar */}
          <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
            <span className="font-display text-sm font-medium tracking-tight text-signal">
              bukmuk
            </span>
            <div className="ml-2 flex flex-1 items-center gap-2 rounded-[3px] border border-line bg-void/50 px-2 py-1 font-mono text-[10px] text-ink-faint">
              <Search size={11} strokeWidth={1.75} /> Search titles, authors…
            </div>
            <Heart size={13} strokeWidth={1.75} className="text-ink-dim" />
            <span className="text-ink-dim">
              <BagCounter inView={inView} />
            </span>
          </div>

          <div className="grid grid-cols-[1fr_128px]">
            {/* Grid */}
            <div className="min-w-0 p-4">
              <div className="mb-3 flex flex-wrap gap-1.5">
                {CHIPS.map((c, i) => (
                  <motion.span
                    key={c}
                    className={`rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-meta ${
                      i === 0
                        ? "border-signal bg-signal-dim text-signal"
                        : "border-line text-ink-dim"
                    }`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {BOOKS.map((b, i) => (
                  <motion.div
                    key={b.t}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                  >
                    <div
                      className={`aspect-[3/4] rounded-[3px] border border-line bg-gradient-to-b ${b.c} p-2`}
                    >
                      <div className="h-1 w-6 rounded-full bg-ink/30" />
                    </div>
                    <div className="mt-1.5 truncate font-mono text-[9px] tracking-meta text-ink-dim">
                      {b.t}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Subscription card */}
            <div className="border-l border-line p-3">
              <div className="rounded-[4px] border border-signal/40 bg-signal-dim p-3">
                <div className="font-mono text-[9px] uppercase tracking-meta text-signal">
                  Membership
                </div>
                <div className="mt-2 font-display text-xl font-medium leading-none text-ink">
                  Family
                </div>
                <div className="mt-1 font-mono text-[9px] tracking-meta text-ink-dim">
                  4 books / month
                </div>
                <div className="mt-3 space-y-1">
                  {["Doorstep delivery", "Wishlist", "Referral rewards"].map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-1.5 font-mono text-[9px] tracking-meta text-ink-dim"
                    >
                      <span className="h-1 w-1 rounded-full bg-signal" /> {f}
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-[3px] bg-ink px-2 py-1.5 text-center font-mono text-[9px] uppercase tracking-meta text-void">
                  Subscribe
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserChrome>
    </div>
  );
}
