import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Dropdown from "../../../components/Dropdown"; // Assuming this is a custom dropdown component

interface Course {
  id: string;
  course: string;
  time: string;
  days: string;
}

const Courses = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<
    | "Information & Computer Science"
    | "Electrical Engineering"
    | "Mechanical Engineering"
    | null
  >(null);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]); // State for multiple selected courses
  const [showCourses, setShowCourses] = useState(false);

  const departmentOptions = [
    {
      value: "Information & Computer Science",
      label: "Information & Computer Science",
    },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  ];

  const courseData: {
    "Information & Computer Science": Course[];
    "Electrical Engineering": Course[];
    "Mechanical Engineering": Course[];
  } = {
    "Information & Computer Science": [
      { id: "1", course: "ICS 104-2", time: "9:00-9:50", days: "UTR" },
      { id: "2", course: "ICS 104-3", time: "10:00-10:50", days: "UTR" },
      { id: "3", course: "ICS 202-1", time: "15:00-15:50", days: "UTR" },
    ],
    "Electrical Engineering": [
      { id: "4", course: "EE 201-1", time: "9:00-9:50", days: "MW" },
      { id: "5", course: "EE 202-2", time: "11:00-11:50", days: "MW" },
    ],
    "Mechanical Engineering": [
      { id: "6", course: "ME 101-1", time: "10:00-10:50", days: "MW" },
      { id: "7", course: "ME 202-1", time: "13:00-13:50", days: "UTR" },
    ],
  };

  const handlePress = (id: string) => {
    if (selectedCourseIds.includes(id)) {
      setSelectedCourseIds((prevIds) =>
        prevIds.filter((courseId) => courseId !== id)
      );
    } else {
      setSelectedCourseIds((prevIds) => [...prevIds, id]);
    }
  };

  const handleReset = () => {
    setSelectedDepartment(null);
    setShowCourses(false);
    setSelectedCourseIds([]);
  };

  const handleDepartmentChange = (item: { value: string }) => {
    setSelectedDepartment(
      item.value as
        | "Information & Computer Science"
        | "Electrical Engineering"
        | "Mechanical Engineering"
        | null
    );
    setShowCourses(item.value !== null);
  };

  const renderCourseSlot = ({ item }: { item: Course }) => {
    const isSelected = selectedCourseIds.includes(item.id);

    return (
      <View
        className={`flex-row justify-between items-center py-3 px-4 bg-white rounded-lg mb-2 ${
          isSelected ? "bg-blue-600" : ""
        }`}
      >
        <Text
          className={`text-lg flex-1 text-center font-poppins ${
            isSelected ? "text-black" : "text-white"
          }`}
        >
          {item.course}
        </Text>
        <Text
          className={`text-lg flex-1 text-center font-poppins ${
            isSelected ? "text-white" : "text-white"
          }`}
        >
          {item.time}
        </Text>
        <Text
          className={`text-lg flex-1 text-center font-poppins ${
            isSelected ? "text-white" : "text-white"
          }`}
        >
          {item.days}
        </Text>
        <TouchableOpacity
          className={`rounded-full px-4 py-1 ${
            isSelected ? "bg-blue" : "bg-white"
          }`}
          onPress={() => handlePress(item.id)}
        >
          <Text
            className={`text-lg font-bold font-poppins ${
              isSelected ? "text-white" : "text-black"
            }`}
          >
            {isSelected ? "✔️" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row justify-between items-center py-4 border-b border-gray-300">
        <TouchableOpacity onPress={handleReset}>
          <Text className="text-xl text-blue-600">X</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold">Add Course</Text>
        <View className="bg-grey rounded-full px-3 py-1">
          <Text className="text-white font-bold font-poppins">241</Text>
        </View>
      </View>

      <View className="flex-1 bg-white rounded-lg shadow-lg p-2 mt-2">
        <Dropdown
          data={departmentOptions}
          onChange={handleDepartmentChange}
          placeholder="Select a department..."
          label="Select a Department"
        />
        {showCourses && selectedDepartment && (
          <>
            <View className="flex-row justify-between py-2 border-b border-gray-300">
              <Text className="flex-1 text-center text-lg font-bold font-poppins">
                Course
              </Text>
              <Text className="flex-1 text-center text-lg font-bold font-poppins">
                Time
              </Text>
              <Text className="flex-1 text-center text-lg font-bold font-poppins">
                Days
              </Text>
              <Text className="flex-1 text-center text-lg font-bold font-poppins">
                Add
              </Text>
            </View>

            <FlatList
              data={courseData[selectedDepartment]}
              renderItem={renderCourseSlot}
              keyExtractor={(item) => item.id}
              className="mt-4 pb-20"
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Courses;
