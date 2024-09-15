interface CollapseBtnProps {
  isOpen: boolean;
  setIsOpen: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
}

function CollapseBtn({ isOpen, setIsOpen }: CollapseBtnProps) {
  return (
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((prevOpen) => !prevOpen)}
    >
      {isOpen ? '–' : '+'}
    </button>
  );
}

export default CollapseBtn;
