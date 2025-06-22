import { Satellite } from "@/app/types/Satellite";
import { IoClose } from "react-icons/io5";

type DataProp = {
  selected: Satellite[];
};

const SelectedPanel = ({ selected }: DataProp) => {
  return (
    <div className="w-[25%]">
      <h6 className="mb-4">Selected Assets</h6>

      <div className="border border-[#01c4fe] h-[65vh] py-4">
        <div className="flex items-center justify-between px-3">
          <p className="text-[#01c4fe] text-sm">
            {selected.length} Object{selected.length !== 1 ? "s" : ""} Selected
          </p>
          <button
            className="text-[#737b7b] text-sm flex items-center gap-1"
            aria-label="Clear selected"
          >
            Clean <IoClose size={18} />
          </button>
        </div>

        <hr className="my-3 border-[#737b7b]" />

        <div className="space-y-2 px-3 overflow-y-auto h-[calc(65vh-70px)]">
          {selected.length > 0 ? (
            selected.map((item) => (
              <div
                key={item.noradCatId}
                className="text-sm text-[#737b7b] flex justify-between items-center"
              >
                <p>{item?.noradCatId}</p>
                <p>{item.name}</p>
                <button aria-label={`Remove ${item.name}`}>
                  <IoClose />
                </button>
              </div>
            ))
          ) : (
            <p className="text-[#999] text-sm">No assets selected.</p>
          )}
        </div>
      </div>

      <button className="bg-[#01c4fe] text-[#3b4147] py-1 w-full mt-3">
        PROCEED
      </button>
    </div>
  );
};

export default SelectedPanel;
