import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const ScheduleVis = () => {
  // Adjust the range and times to fit your requirements
  const hours = Array.from({ length: 12 }, (_, i) => `${7 + i}:00`);
  const days = ["SUN", "MON", "TUE", "WED", "THU"];

  return (
    <div className="bg-gray-50 p-6 pl-6 rounded-lg shadow-md w-full mb-4">
      <div className="">
        <div className="grid grid-cols-6 text-sm py-4">
          <div></div>

          {days.map((day, idx) => (
            <div
              key={idx}
              className="py-4 text-center font-semibold text-gray-800  rounded-md"
            >
              {day}
            </div>
          ))}

          {hours.map((hour, idx) => (
            <React.Fragment key={idx}>
              <div className="text-center text-gray-800 mr-4 font-medium">
                {hour}
              </div>

              {days.map((_, dayIdx) => (
                <div
                  key={dayIdx}
                  className="border border-gray-300 h-12 bg-white hover:bg-gray-100 transition-colors duration-200"
                ></div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleVis;
