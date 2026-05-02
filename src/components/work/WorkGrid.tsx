"use client";

import { motion } from "framer-motion";
import { WorkCard } from "./WorkCard";
import type { Work } from "@/types/work";

interface WorkGridProps {
  works: Work[];
}

export function WorkGrid({ works }: WorkGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      style={{ perspective: "1800px" }}
    >
      {works.map((work, i) => (
        <motion.div
          key={work.slug}
          initial={{ rotateY: 60, z: -200, opacity: 0 }}
          whileInView={{ rotateY: 0, z: 0, opacity: 1 }}
          transition={{
            duration: 1.4,
            delay: i * 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <WorkCard work={work} />
        </motion.div>
      ))}
    </div>
  );
}
