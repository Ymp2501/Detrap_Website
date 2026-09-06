import { Suspense } from "react";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { GuideLibrary } from "./components/sections/GuideLibrary";
import { CourseSection } from "./components/sections/CourseSection";
import { ReportsSection } from "./components/sections/ReportsSection";
import { PDCSection } from "./components/sections/PDCSection";
import { SchoolsSection } from "./components/sections/SchoolsSection";
import { AboutSection } from "./components/sections/AboutSection";

function App() {
  return (
    <Suspense fallback={null}>
      <Nav />
      <main>
        <Hero />
        <GuideLibrary />
        <CourseSection />
        <ReportsSection />
        <PDCSection />
        <SchoolsSection />
        <AboutSection />
      </main>
      <Footer />
    </Suspense>
  );
}

export default App;
