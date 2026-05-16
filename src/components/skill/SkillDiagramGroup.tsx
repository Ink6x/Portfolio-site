"use client";

import { motion } from "framer-motion";
import { PentagonSkillChart } from "./PentagonSkillChart";
import { SKILL_DIAGRAMS } from "@/content/skills";

export function SkillDiagramGroup() {
  return (
    <div
      className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-20"
      style={{ perspective: "1800px" }}
    >
      {SKILL_DIAGRAMS.map((diagram, i) => (
        <motion.div
          key={diagram.title}
          initial={{ rotateY: 60, z: -200, opacity: 0 }}
          whileInView={{ rotateY: 0, z: 0, opacity: 1 }}
          transition={{
            duration: 1.4,
            delay: i * 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <PentagonSkillChart diagram={diagram} />
        </motion.div>
      ))}
    </div>
  );
}
