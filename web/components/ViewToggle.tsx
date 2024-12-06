import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

const ViewToggle = ({
  isTableView,
  setIsTableView,
}: {
  setIsTableView: Dispatch<SetStateAction<boolean>>;
  isTableView: boolean;
}) => {
  return (
    <div className="z-30">
      <Button
        variant="default"
        onClick={() => setIsTableView((prev) => !prev)}
        className="fixed bottom-8 right-8 px-4 py-2 rounded-xl font-semibold shadow-lg"
      >
        {isTableView ? "Switch to Chart" : "Switch to Table"}
      </Button>
    </div>
  );
};
export default ViewToggle;
