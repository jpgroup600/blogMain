type Props = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
};

const PaginationBar: React.FC<Props> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPrev,
  onNext,
  disabled,
}) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-4 text-xs uppercase tracking-wide text-paragraph md:flex-row md:items-center md:justify-between">
      <span>
        Showing {start}-{end} of {totalItems}
      </span>
      <div className="flex items-center gap-3 text-sm normal-case">
        <button
          type="button"
          className="border-border text-paragraph hover:border-primary/60 hover:text-primary/70 disabled:opacity-40 rounded-full border px-4 py-2 transition-colors"
          onClick={onPrev}
          disabled={currentPage === 1 || disabled}
        >
          Previous
        </button>
        <span className="font-semibold">
          {currentPage}/{totalPages}
        </span>
        <button
          type="button"
          className="border-border text-paragraph hover:border-primary/60 hover:text-primary/70 disabled:opacity-40 rounded-full border px-4 py-2 transition-colors"
          onClick={onNext}
          disabled={currentPage === totalPages || disabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;

