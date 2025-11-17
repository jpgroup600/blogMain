import type { Categories } from "./types/payload-types";

type Props = {
  categories: Categories;
  activeSlug: string;
  onChange: (slug: string) => void;
};

const baseButtonClass =
  "group relative overflow-hidden rounded-full border border-border bg-white/80 px-4 py-2 text-dark shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 dark:bg-white/10 cursor-pointer active:scale-95 data-[active='true']:shadow-md data-[active='true']:shadow-primary/25 data-[active='true']:bg-black";

const fillSpanClass =
  "absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary translate-x-[-100%] group-hover:translate-x-0 group-data-[active='true']:translate-x-0 transition-transform duration-500 ease-out";

const textSpanClass =
  "relative z-10 text-dark dark:text-light transition-colors duration-300 group-hover:background-white group-data-[active='true']:text-white dark:group-hover:text-white dark:group-data-[active='true']:text-white";

const CategoryFilterPills: React.FC<Props> = ({
  categories,
  activeSlug,
  onChange,
}) => (
  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
    <button
      type="button"
      data-active={activeSlug === "all"}
      className={baseButtonClass}
      onClick={() => onChange("all")}
    >
      <span className={fillSpanClass} />
      <span className={textSpanClass}>All categories</span>
    </button>
    {categories.docs.map((category) => (
      <button
        key={category.id}
        type="button"
        data-active={activeSlug === category.slug}
        className={baseButtonClass}
        onClick={() => onChange(category.slug)}
      >
        <span className={fillSpanClass} />
        <span className={textSpanClass}>{category.title}</span>
      </button>
    ))}
  </div>
);

export default CategoryFilterPills;

