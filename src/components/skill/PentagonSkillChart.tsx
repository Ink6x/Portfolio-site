import type { SkillDiagram } from "@/types/skill";

interface PentagonSkillChartProps {
  diagram: SkillDiagram;
}

const SIZE = 200;
const CENTER = SIZE / 2;
const MAX_VALUE = 5;
const LEVELS = 5;

function polarToCartesian(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function buildPolygon(values: number[], maxRadius: number): string {
  const count = values.length;
  return values
    .map((v, i) => {
      const angle = (360 / count) * i;
      const r = (v / MAX_VALUE) * maxRadius;
      const { x, y } = polarToCartesian(angle, r);
      return `${x},${y}`;
    })
    .join(" ");
}

function buildAxisPoints(count: number, radius: number): Array<{ x: number; y: number }> {
  return Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i;
    return polarToCartesian(angle, radius);
  });
}

export function PentagonSkillChart({ diagram }: PentagonSkillChartProps) {
  const maxRadius = SIZE * 0.38;
  const count = diagram.axes.length;
  const axisPoints = buildAxisPoints(count, maxRadius);

  const levelPolygons = Array.from({ length: LEVELS }, (_, i) => {
    const r = ((i + 1) / LEVELS) * maxRadius;
    return buildPolygon(Array(count).fill(MAX_VALUE), r);
  });

  const dataPolygon = buildPolygon(
    diagram.axes.map((a) => a.value),
    maxRadius
  );

  const textRadius = maxRadius + 30;
  const labelPoints = buildAxisPoints(count, textRadius);

  const ariaLabel = `${diagram.title}: ${diagram.axes
    .map((a) => `${a.label} ${a.value}/${MAX_VALUE}`)
    .join(", ")}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width={SIZE}
        height={SIZE + 20}
        viewBox={`0 0 ${SIZE} ${SIZE + 20}`}
        aria-label={ariaLabel}
        role="img"
        className="overflow-visible"
      >
        {/* Grid levels */}
        {levelPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
          />
        ))}

        {/* Axis lines */}
        {axisPoints.map((pt, i) => (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={pt.x}
            y2={pt.y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
        ))}

        {/* Data polygon */}
        <polygon
          points={dataPolygon}
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
        />

        {/* Axis labels */}
        {labelPoints.map((pt, i) => {
          const ax = diagram.axes[i];
          const dx = pt.x - CENTER;
          const textAnchor =
            Math.abs(dx) < 10 ? "middle" : dx > 0 ? "start" : "end";
          return (
            <text
              key={i}
              x={pt.x}
              y={pt.y}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              fontSize="15"
              fill="rgba(255,255,255,0.45)"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {ax.label}
            </text>
          );
        })}
      </svg>

      <h3
        className="text-[20px] tracking-widest text-[var(--color-text-muted)]"
        style={{
          fontFamily: "var(--font-menu)",
          transform: "scaleX(1.2)",
          transformOrigin: "center",
        }}
      >
        {diagram.title}
      </h3>
    </div>
  );
}
