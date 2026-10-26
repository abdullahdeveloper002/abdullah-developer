"use client";

import { useId, useRef, useState } from "react";
import { skillGroups as groups } from "@/data/skills";
import { cn } from "@/lib/utils";
import BrandLogo from "./BrandLogo";

/** Category pills that switch a grid of skill tiles. Arrow keys move between tabs. */
export default function SkillTabs() {
  const baseId = useId();
  const [activeId, setActiveId] = useState(groups[0].id);
  const tabRefs = useRef({});
  const active = groups.find((group) => group.id === activeId);

  function select(id) {
    setActiveId(id);
    tabRefs.current[id]?.focus();
  }

  function onKeyDown(event, index) {
    const last = groups.length - 1;
    const target = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(groups[target].id);
  }

  return (
    <div>
      <div role="tablist" aria-label="Skill categories" className="flex flex-wrap gap-3">
        {groups.map(({ id, title }, index) => {
          const selected = id === activeId;
          return (
            <button
              key={id}
              ref={(node) => {
                tabRefs.current[id] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "inline-flex min-h-12 items-center gap-2.5 rounded-full border px-5 py-2.5 font-medium",
                selected
                  ? "on-lime border-lime bg-lime text-ink"
                  : "border-line bg-surface text-ink hover:border-lime-deep/60 hover:bg-lime-soft",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("size-2.5 rounded-full", selected ? "bg-ink" : "bg-lime-deep")}
              />
              {title}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${activeId}`}
        tabIndex={0}
        className="mt-8 rounded-card"
      >
        <p className="mb-5 text-ink-soft">{active.blurb}</p>
        <ul className="flex flex-wrap justify-center gap-4">
          {active.items.map(({ name, logo }) => (
            <li
              key={name}
              className="flex min-h-40 w-[calc(50%-0.5rem)] flex-col items-center justify-center gap-4 rounded-card border border-line bg-surface p-4 text-center sm:min-h-48 sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(16.666%-0.834rem)]"
            >
              <BrandLogo name={logo} className="size-12 shrink-0" />
              <span className="font-medium">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
