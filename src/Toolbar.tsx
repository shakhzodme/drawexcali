import {
  IconArrowRight,
  IconCircle,
  IconDiamonds,
  IconHandStop,
  IconLetterCase,
  IconLine,
  IconPencil,
  IconPhoto,
  IconPointerFilled,
  IconSquare,
} from "@tabler/icons-react";
import { EVENT_INSERT_TEXT } from "./events";

export const Toolbar: React.FC = () => {
  const fireEvent = (event: Event) => {
    document.body.dispatchEvent(event);
  };

  return (
    <div className="mx-auto bg-white shadow-lg relative pointer-events-auto flex p-2 rounded-lg border gap-2">
      <button type="button" className="disabled:opacity-20" disabled>
        <IconHandStop size={14} />
      </button>
      <button type="button" className="disabled:opacity-20" disabled>
        <IconPointerFilled size={14} />
      </button>
      <button type="button" className="disabled:opacity-20" disabled>
        <IconSquare size={14} />
      </button>
      <button type="button" className="disabled:opacity-20" disabled>
        <IconDiamonds size={14} />
      </button>
      <button type="button" className="disabled:opacity-20" disabled>
        <IconCircle size={14} />
      </button>
      <button type="button" className="disabled:opacity-20" disabled>
        <IconArrowRight size={14} />
      </button>
      <button type="button" className="disabled:opacity-20" disabled>
        <IconLine size={14} />
      </button>
      <button type="button" className="disabled:opacity-20" disabled>
        <IconPencil size={14} />
      </button>
      <button
        type="button"
        className="disabled:opacity-20"
        onClick={() => fireEvent(EVENT_INSERT_TEXT)}
      >
        <IconLetterCase size={14} />
      </button>
      <button type="button" className="disabled:opacity-20" disabled>
        <IconPhoto size={14} />
      </button>
    </div>
  );
};
