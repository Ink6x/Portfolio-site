import { PageShell } from "@/components/layout/PageShell";
import { JullienLabSection } from "@/components/sections/JullienLabSection";
import { TypewriterSection } from "@/components/sections/TypewriterSection";
import { AboutMeSection } from "@/components/sections/AboutMeSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SkillStackSection } from "@/components/sections/SkillStackSection";
import { ContactMeSection } from "@/components/sections/ContactMeSection";
import { TerminalLauncher } from "@/components/terminal/TerminalLauncher";

export default function HomePage() {
  return (
    <PageShell>
      <JullienLabSection />
      <TypewriterSection />
      <AboutMeSection />
      <WorkSection />
      <SkillStackSection />
      <ContactMeSection />
      <TerminalLauncher />
    </PageShell>
  );
}
