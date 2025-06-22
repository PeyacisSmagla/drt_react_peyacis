import { FixedSizeList as List } from "react-window";
import { Satellite } from "../types/Satellite";
import { useMemo } from "react";

type Props = {
  data: Satellite[];
  selected: Satellite[];
  setSelected: (sat: Satellite[]) => void;
};

export default function SatelliteList({ data, selected, setSelected }: Props) {
  const isAllSelected = useMemo(() => {
    return (
      data.length > 0 &&
      data.every((sat) => selected.some((s) => s.noradCatId === sat.noradCatId))
    );
  }, [data, selected]);

  const handleSelectAll = () => {
    if (isAllSelected) {
      const newSelection = selected.filter(
        (s) => !data.some((d) => d.noradCatId === s.noradCatId)
      );
      setSelected(newSelection);
    } else {
      const newItems = data.filter(
        (sat) => !selected.some((s) => s.noradCatId === sat.noradCatId)
      );
      setSelected([...selected, ...newItems]);
    }
  };

  const handleRowSelect = (sat: Satellite) => {
    const isSelected = selected.some((s) => s.noradCatId === sat.noradCatId);
    if (isSelected) {
      setSelected(selected.filter((s) => s.noradCatId !== sat.noradCatId));
    } else {
      setSelected([...selected, sat]);
    }
  };

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const sat = data[index];
    const isChecked = selected.some((s) => s.noradCatId === sat.noradCatId);

    return (
      <div style={style}>
        <div className="grid grid-cols-7 bg-[#101010] px-2 py-2 text-sm text-[#d4e0e7] hover:bg-[#1a1a1a]">
          <label className="inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleRowSelect(sat)}
              className="sr-only"
            />
            <div
              className="w-4 h-4 rounded-md border-2 flex items-center justify-center transition-colors"
              style={{ borderColor: "var(--primary)" }}
            >
              {isChecked && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </label>

          <div>{sat.noradCatId}</div>
          <div className="truncate max-w-[140px] whitespace-nowrap overflow-hidden">
            {sat.name}
          </div>
          <div>{sat.orbitCode ?? "-"}</div>
          <div>{sat.objectType ?? "-"}</div>
          <div>{sat.countryCode ?? "-"}</div>
          <div>{sat.launchDate ?? "-"}</div>
        </div>
      </div>
    );
  };

  const SkeletonRow = ({ style }: { style: React.CSSProperties }) => (
    <div style={style}>
      <div className="grid grid-cols-7 px-2 py-2 text-sm animate-pulse text-gray-600">
        <div className="h-4 w-4 bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-700 rounded col-span-1 w-20"></div>
        <div className="h-4 bg-gray-700 rounded col-span-1 w-24"></div>
        <div className="h-4 bg-gray-700 rounded w-12"></div>
        <div className="h-4 bg-gray-700 rounded w-16"></div>
        <div className="h-4 bg-gray-700 rounded w-12"></div>
        <div className="h-4 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  );

  return (
    <div className="max-h-[550px] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1 text-sm">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
            id="select"
          />
          <label
            htmlFor="select"
            className="select-none text-[var(--text-secondary)] text-xs"
          >
            Select All
          </label>
        </div>

        <p className="text-gray-600">{data?.length} Objects</p>
      </div>
      <hr className="border-[#1f1f1f] mb-3" />

      <div className="max-h-[550px] overflow-y-auto scrollbar-blue">
        <div className="grid grid-cols-7 px-2 py-2 sticky top-0 text-sm font-medium bg-transparent text-[#4e626a]">
          <div></div>
          <div>NORAD ID</div>
          <div>Name</div>
          <div>Orbit</div>
          <div>Type</div>
          <div>Country</div>
          <div>Launch Date</div>
        </div>

        {data.length > 0 ? (
          <List height={400} itemCount={data.length} itemSize={40} width="100%">
            {Row}
          </List>
        ) : (
          <List height={400} itemCount={10} itemSize={40} width="100%">
            {SkeletonRow}
          </List>
        )}
      </div>
    </div>
  );
}
