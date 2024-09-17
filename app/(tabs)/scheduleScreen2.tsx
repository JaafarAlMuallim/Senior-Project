// ScheduleScreen.tsx
import React, { useCallback, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Modal,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import {
  Agenda,
  AgendaList,
  WeekCalendar,
  CalendarList,
  CalendarProvider,
  ExpandableCalendar,
  Timeline,
} from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import ScheduleHeader from "./components/ScheduleHeader";
import { format, parseISO } from "date-fns";
import { Ionicons } from "@expo/vector-icons";



LocaleConfig.locales["fr"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  today: "Today",
};
LocaleConfig.defaultLocale = "fr";

const agendaItems = [
  {
    title: "2024-09-10",
    data: [
      {
        id: "1",
        name: "MATH 101",
        startTime: "10:00",
        endTime: "10:50",
        location: "5-135",
        instructor: "TAMEM AL-SHORMAN",
      },
      {
        id: "3",
        name: "MATH 102",
        startTime: "11:00",
        endTime: "11:50",
        location: "5-135",
        instructor: "TAMEM AL-SHORMAN",
      },
    ],
  },
  {
    title: "2024-09-11",
    data: [
      {
        id: "2",
        name: "PHYS 101",
        startTime: "11:00",
        endTime: "13:40",
        location: "6-236",
        instructor: "A GHANNAM",
      },
    ],
  },
];

const ItemContainer = styled(
  SafeAreaView,
  "bg-default-white p-4 my-2 rounded-xl flex-row",
);
const HiddenSection = styled(SafeAreaView, "h-0 overflow-hidden");

const AgendaItem = ({ item }: { item: any }) => (
  <ItemContainer>
    <Text className="w-20 text-gray-500 text-sm">{`${item.startTime} - ${item.endTime}`}</Text>
    <SafeAreaView className="bg-white-default shadow flex-1 ml-2">
      <Text className=" text-primary-dark text-lg">{item.name}</Text>
      <Text className="text-secondary-gray">{item.location}</Text>
      <Text className="text-secondary-gray">{item.instructor}</Text>
    </SafeAreaView>
  </ItemContainer>
);

const ScheduleScreen2: React.FC = () => {
  const [viewMode, setViewMode] = useState<"Today" | "Weekly">("Today");
  const [selectedDate, setSelectedDate] = useState("2024-09-10");
  const dateObject = parseISO(selectedDate);
  const dayNum = format(dateObject, "dd");
  const dayName = dateObject.toLocaleDateString("en-US", {
    weekday: "short",
  });
  const monthYear = format(dateObject, "MMM yyyy");
  const [term, setTerm] = useState("231");
  const [isTermModalVisible, setIsTermModalVisible] = useState(false);
  const terms = ["231", "232", "241"];

  const events = [
    {
      start: new Date("2024-09-24 09:00"),
      end: new Date("2024-09-24 10:00"),
      title: "MATH 101",
      location: "6-135",
    },
    {
      start: new Date("2024-09-24 10:00"),
      end: new Date("2024-09-24 11:00"),
      title: "PHYS 101",
      location: "6-235",
    },
    {
      start: new Date("2024-09-24 11:00"),
      end: new Date("2024-09-24 13:00"),
      title: "PE 101",
      location: "11-131",
    },
    {
      start: new Date("2024-09-24 12:00"),
      end: new Date("2024-09-24 13:00"),
      title: "ICS 104",
      location: "22-321",
    },
    {
      start: new Date("2024-09-25 09:00"),
      end: new Date("2024-09-25 10:00"),
      title: "MATH 101",
      location: "6-135",
    },
    {
      start: new Date("2024-09-25 10:00"),
      end: new Date("2024-09-25 11:00"),
      title: "PHYS 101",
      location: "6-235",
    },
    {
      start: new Date("2024-09-26 09:00"),
      end: new Date("2024-09-26 10:00"),
      title: "MATH 101",
      location: "6-135",
    },
    {
      start: new Date("2024-09-26 10:00"),
      end: new Date("2024-09-26 12:00"),
      title: "PHYS 101",
      location: "6-266",
    },
    {
      start: new Date("2024-09-27 10:00"),
      end: new Date("2024-09-27 11:00"),
      title: "MATH 101",
      location: "5-135",
    },
    {
      start: new Date("2024-09-27 11:00"),
      end: new Date("2024-09-27 13:00"),
      title: "PHYS 101",
      location: "6-266",
    },
  ];

  const markedDates = {
    [selectedDate]: { selected: true, selectedColor: "#4561FF" },
  };

  const filteredAgendaItems = agendaItems.filter(
    (section: any) => section.title === selectedDate,
  );

  const renderItem = useCallback(({ item }: { item: any }) => {
    return <AgendaItem item={item} />;
  }, []);

  const isCurrentDayEvent = (eventDate: any) => {
    const selected = new Date(selectedDate).toDateString();
    const eventDay = new Date(eventDate).toDateString();
    return selected === eventDay;
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <View className="flex-column justify-between items-center px-4 pb-3 bg-primary-white w-screen">
        <View className="flex flex-row items-center justify-between w-screen p-2">
          <TouchableOpacity
            className="bg-schedule-term rounded-lg justify-center"
            onPress={() => setIsTermModalVisible(true)}
          >
            <Text className="text-base font-poppinsBold font-bold text-primary-dark justify-center py-2 px-3">
              {term}
            </Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-primary-dark">Schedule</Text>
          <TouchableOpacity className="bg-primary-white p-0.5 rounded-full border-2 border-primary-dark">
            <Ionicons name="add" size={18} color="#3044FF" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between w-screen px-5">
          <View className="flex-row">
            <Text className="text-5xl font-poppinsBold font-bold text-primary-black mt-2 mr-2">
              {dayNum}
            </Text>
            <View className="flex-column">
              <Text className="text-base font-poppinsSemiBold font-bold text-primary-black mt-1">
                {dayName}
              </Text>
              <Text className="text-base font-poppinsSemiBold font-bold text-gray-medium">
                {monthYear}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              setViewMode(viewMode === "Today" ? "Weekly" : "Today")
            }
            className="px-2 py-1 bg-schedule-term rounded-md"
          >
            <Text className="text-base font-poppinsBold font-bold text-primary-dark justify-center py-1 px-2">
              {viewMode === "Today" ? "Today" : "Weekly"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <CalendarProvider date={selectedDate}>
        <WeekCalendar
          firstDay={0}
          current={selectedDate}
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            todayTextColor: "red",
            dayTextColor: "black",
            textDisabledColor: "gray",
            selectedDayBackgroundColor: "#4561FF",
            selectedDayTextColor: "white",
            monthTextColor: "transparent",
            textSectionTitleColor: "gray",
            textDayFontWeight: "bold",
          }}
        />
        {viewMode === "Weekly" ? (
          <Timeline
            format24h={true}
            eventTapped={(event) => console.log(event)}
            events={events.map((event) => ({
              start: event.start,
              end: event.end,
              title: event.title,
              summary: event.location,
              color: isCurrentDayEvent(event.start) ? "#4561FF" : "#E0E7FF",
              textColor: isCurrentDayEvent(event.start) ? "white" : "black",
            }))}
            columns={5}
            dayStartHour={8}
            style={{
              eventContainerStyle: {
                borderRadius: 10,
              },
              eventTitleStyle: {
                fontSize: 12,
                fontWeight: "bold",
              },
              eventSummaryStyle: {
                fontSize: 10,
              },
            }}
          />
        ) : (
          <AgendaList sections={filteredAgendaItems} renderItem={renderItem} />
        )}
      </CalendarProvider>
      <Modal
        transparent={true}
        visible={isTermModalVisible}
        animationType="slide"
        onRequestClose={() => setIsTermModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-primary-black opacity-75 z-0" />

          <View className="bg-primary-white w-3/4 rounded-lg p-4 z-10 shadow-lg">
            <Text className="text-xl font-bold mb-4">Select Term</Text>

            <ScrollView>
              {terms.map((item) => (
                <TouchableOpacity
                  key={item}
                  className="py-2"
                  onPress={() => {
                    setTerm(item);
                    setIsTermModalVisible(false);
                  }}
                >
                  <Text
                    className={`text-lg ${term === item ? "font-bold" : "font-normal"}`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              className="mt-4 bg-blue-500 py-2 rounded-lg"
              onPress={() => setIsTermModalVisible(false)}
            >
              <Text className="text-center text-white text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduleScreen2;
