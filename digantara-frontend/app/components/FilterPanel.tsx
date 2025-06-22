import { GoDotFill } from "react-icons/go";
import { SiCircleci } from "react-icons/si";
import { BsRocketFill } from "react-icons/bs";
import { TbTriangleFilled } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { IoMdCloseCircle } from "react-icons/io";
import CustomSelect from "./CustomSelect";

const orbitCodes = [
  "LEO",
  "LEO1",
  "LEO2",
  "LEO3",
  "LEO4",
  "MEO",
  "GEO",
  "HEO",
  "IGO",
  "EGO",
  "NSO",
  "GTO",
  "GHO",
  "HAO",
  "MGO",
  "LMO",
  "UFO",
  "ESO",
  "UNKNOWN",
];

const objectTypes = ["PAYLOAD", "ROCKET BODY", "DEBRIS", "UNKNOWN"];

type ObjectTypeCounts = {
  payloads: number;
  debris: number;
  rocketBodies: number;
  unknown: number;
};

type Props = {
  searchValue: string;
  onSearchChange: (val: string) => void;
  objectTypeFilter: string[];
  setObjectTypeFilter: (val: string[]) => void;
  orbitCodeFilter: string[];
  setOrbitCodeFilter: (val: string[]) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  filteredCount: number;
  filtersApplied: boolean;
  objectTypeCounts: ObjectTypeCounts;
};

export default function FilterPanel({
  searchValue,
  onSearchChange,
  objectTypeFilter,
  setObjectTypeFilter,
  orbitCodeFilter,
  setOrbitCodeFilter,
  onApplyFilters,
  onClearFilters,
  filteredCount,
  filtersApplied,
  objectTypeCounts,
}: Props) {
  return (
    <>
      <div className="bg-[#1f1f1f] flex items-center flex-wrap justify-between px-3 py-2 rounded-2xl gap-2 text-xs">
        <p className="border border-[var(--primary)] rounded-2xl px-2 py-[0.15rem]">
          All Objects ({filteredCount})
        </p>
        <p className="flex items-center gap-1">
          <GoDotFill size={18} color="var(--primary)" /> Payloads (
          {objectTypeCounts.payloads})
        </p>
        <p className="flex items-center gap-1">
          <SiCircleci size={11} style={{ transform: "rotate(200deg)" }} />{" "}
          Debris ({objectTypeCounts.debris})
        </p>
        <p className="flex items-center gap-1">
          <BsRocketFill size={11} /> Rocket Bodies (
          {objectTypeCounts.rocketBodies})
        </p>
        <p className="flex items-center gap-1">
          <TbTriangleFilled size={11} style={{ transform: "rotate(30deg)" }} />{" "}
          Unknown ({objectTypeCounts.unknown})
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center bg-[#1f1f1f] px-3 py-1 rounded-2xl w-full sm:w-[260px]">
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onApplyFilters()}
            placeholder="Search by name/NORAD ID"
            className="flex-1 bg-transparent text-white text-xs placeholder:text-gray-400 outline-none pr-2"
          />
          <IoClose
            className="text-gray-400 cursor-pointer"
            onClick={onClearFilters}
          />
          <FiSearch
            size={18}
            className="text-white bg-black p-[0.2rem] rounded-full ml-1"
          />
        </div>

        <CustomSelect
          options={objectTypes}
          selected={objectTypeFilter}
          onChange={setObjectTypeFilter}
          placeholder="Object Type"
        />

        <CustomSelect
          options={orbitCodes}
          selected={orbitCodeFilter}
          onChange={setOrbitCodeFilter}
          placeholder="Orbit Code"
        />

        <button
          onClick={onApplyFilters}
          className="bg-[var(--primary)] text-black text-xs px-4 py-1 rounded-xl font-semibold"
        >
          Apply Filters
        </button>

        {filtersApplied ? (
          <div className="relative" onClick={onClearFilters}>
            <LuFilter
              size={27}
              className="bg-[#1f1f1f] p-[0.35rem] rounded-2xl cursor-pointer"
              title="Clear filters"
            />
            <IoMdCloseCircle className="absolute top-[.8rem] left-[.7rem] text-xs text-red-600 cursor-pointer" />
          </div>
        ) : (
          <LuFilter
            size={27}
            className="bg-[#1f1f1f] p-[0.4rem] rounded-full"
            title="No filters applied"
          />
        )}
      </div>
    </>
  );
}
