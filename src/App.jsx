import { Suspense, lazy, useEffect, useState } from "react";
import { useLenis } from "./lib/useLenis";
import { prefersReducedMotion } from "./lib/useReducedMotion";
import { nav } from "./data/site";

import Preloader from "./sections/Preloader";
import Cursor from "./components/Cursor";
import Rail from "./components/Rail";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";

// Below-the-fold sections lazy-loaded to keep the hero bundle lean.
const About = lazy(() => import("./sections/About"));
const Experience = lazy(() => import("./sections/Experience"));
const Projects = lazy(() => import("./sections/Projects"));
const TestMindPipeline = lazy(() => import("./sections/TestMindPipeline"));
const Skills = lazy(() => import("./sections/Skills"));
const Philosophy = lazy(() => import("./sections/Philosophy"));
const ResumeCTA = lazy(() => import("./sections/ResumeCTA"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

const SESSION_KEY = "aky_preloaded";

export default function App() {
  const reduced = prefersReducedMotion();
  const [loading, setLoading] = useState(() => {
    if (reduced) return false;
    if (typeof sessionStorage !== "undefined") {
      return !sessionStorage.getItem(SESSION_KEY);
    }
    return true;
  });

  useLenis(true);

  useEffect(() => {
    if (!loading && typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, [loading]);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Cursor />
      <Rail sections={nav} />

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:uppercase focus:tracking-meta focus:text-void"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero started={!loading} />
        <Suspense fallback={<div className="h-px" />}>
          <About />
          <Experience />
          <Projects />
          <TestMindPipeline />
          <Skills />
          <Philosophy />
          <ResumeCTA />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
