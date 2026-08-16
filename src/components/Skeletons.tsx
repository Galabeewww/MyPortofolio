import React from "react";

// Project Card Skeleton Placeholder
export const ProjectsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden flex flex-col justify-between p-0 animate-pulse shadow-lg"
        >
          {/* Image Box Skeleton */}
          <div className="w-full aspect-[16/10] bg-[var(--bg-secondary)] relative border-b border-[var(--border-color)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Content Skeleton */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="w-20 h-5 rounded-full bg-[var(--bg-secondary)]" />
              <div className="w-3/4 h-7 rounded-xl bg-[var(--bg-secondary)]" />
              <div className="space-y-2 pt-1">
                <div className="w-full h-4 rounded-lg bg-[var(--bg-secondary)]" />
                <div className="w-5/6 h-4 rounded-lg bg-[var(--bg-secondary)]" />
              </div>
            </div>

            {/* Tech Stack Skeleton */}
            <div className="flex gap-2 pt-2">
              <div className="w-16 h-6 rounded-lg bg-[var(--bg-secondary)]" />
              <div className="w-20 h-6 rounded-lg bg-[var(--bg-secondary)]" />
              <div className="w-14 h-6 rounded-lg bg-[var(--bg-secondary)]" />
            </div>

            {/* Button Bar Skeleton */}
            <div className="flex gap-3 pt-4 border-t border-[var(--border-color)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)]" />
              <div className="flex-1 h-10 rounded-xl bg-[var(--bg-secondary)]" />
              <div className="flex-1 h-10 rounded-xl bg-[var(--bg-secondary)]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Skills Marquee Skeleton Placeholder
export const SkillsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 py-4 animate-pulse max-w-7xl mx-auto">
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={`s1_${n}`}
            className="flex-shrink-0 w-44 sm:w-52 h-16 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-4 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] shrink-0" />
            <div className="w-24 h-4 rounded-md bg-[var(--bg-secondary)]" />
          </div>
        ))}
      </div>
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={`s2_${n}`}
            className="flex-shrink-0 w-44 sm:w-52 h-16 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-4 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] shrink-0" />
            <div className="w-24 h-4 rounded-md bg-[var(--bg-secondary)]" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Experience Skeleton Placeholder
export const ExperienceSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse max-w-4xl mx-auto pt-4">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-4"
        >
          <div className="flex justify-between items-center">
            <div className="w-32 h-6 rounded-full bg-[var(--bg-secondary)]" />
            <div className="w-20 h-5 rounded-full bg-[var(--bg-secondary)]" />
          </div>
          <div className="w-1/2 h-7 rounded-xl bg-[var(--bg-secondary)]" />
          <div className="w-1/3 h-5 rounded-lg bg-[var(--bg-secondary)]" />
          <div className="space-y-2 pt-2">
            <div className="w-full h-4 rounded-md bg-[var(--bg-secondary)]" />
            <div className="w-4/5 h-4 rounded-md bg-[var(--bg-secondary)]" />
          </div>
        </div>
      ))}
    </div>
  );
};

// About Skeleton Placeholder
export const AboutSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse pt-4">
      <div className="lg:col-span-6 space-y-6">
        <div className="w-28 h-6 rounded-full bg-[var(--bg-secondary)]" />
        <div className="w-3/4 h-8 rounded-xl bg-[var(--bg-secondary)]" />
        <div className="space-y-3">
          <div className="w-full h-4 rounded-md bg-[var(--bg-secondary)]" />
          <div className="w-full h-4 rounded-md bg-[var(--bg-secondary)]" />
          <div className="w-2/3 h-4 rounded-md bg-[var(--bg-secondary)]" />
        </div>
      </div>
      <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] h-44 flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)]" />
            <div className="w-24 h-5 rounded-md bg-[var(--bg-secondary)]" />
          </div>
        ))}
      </div>
    </div>
  );
};
