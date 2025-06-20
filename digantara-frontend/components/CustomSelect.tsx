import React, { useState, useRef, useEffect, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";

interface CustomMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  options: string[];
  placeholder?: string;
}

function getDisplayText(selected: string[], placeholder: string): string {
  if (selected.length === 0) return placeholder;
  if (selected.length === 1) return selected[0];
  return `${selected[0]} +${selected.length - 1}`;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  selected,
  onChange,
  options,
  placeholder = "Select",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    const isSelected = selected.includes(value);
    const newSelected = isSelected
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  const displayText = useMemo(
    () => getDisplayText(selected, placeholder),
    [selected, placeholder]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative text-xs min-w-[250px] max-w-[200px] flex-shrink-0"
    >
      <button
        type="button"
        className="bg-[#1f1f1f] text-white px-3 py-2 rounded-2xl w-full flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <span className={selected.length === 0 ? "text-gray-400" : ""}>
          {displayText}
        </span>
        <FiChevronDown className="text-gray-400 ml-2" size={16} />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-[#1f1f1f] rounded-xl border border-gray-700 shadow-md max-h-40 overflow-auto">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center px-3 py-2 hover:bg-gray-800 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggleOption(opt)}
                className="mr-2 accent-[#01c4fe]"
              />
              <span className="text-white">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;
