"use client"; // Enables client-side rendering and hooks in Next.js

import React, { useState } from "react";
import { format, parseISO } from "date-fns";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const EVENTS = [
  {
    day: "Sunday",
    classes: [
      {
        id: "12",
        title: "History 101",
        start: "08:00",
        end: "09:30",
        location: "Room 107",
        instructor: "Prof. Kevin Moore",
      },
      {
        id: "13",
        title: "Art 205",
        start: "10:00",
        end: "11:30",
        location: "Room 207",
        instructor: "Ms. Laura Scott",
      },
    ],
  },
  {
    day: "Monday",
    classes: [
      {
        id: "1",
        title: "Mathematics 101",
        start: "08:00",
        end: "09:30",
        location: "Room 101",
        instructor: "Dr. Alice Johnson",
      },
      {
        id: "2",
        title: "Physics 202",
        start: "10:00",
        end: "11:30",
        location: "Room 204",
        instructor: "Prof. Bob Smith",
      },
      {
        id: "3",
        title: "Chemistry 303",
        start: "14:00",
        end: "15:30",
        location: "Lab 301",
        instructor: "Dr. Carla Davis",
      },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      {
        id: "4",
        title: "Programming 101",
        start: "09:00",
        end: "10:30",
        location: "Room 102",
        instructor: "Mr. David Brown",
      },
      {
        id: "5",
        title: "Algorithms 201",
        start: "11:00",
        end: "12:30",
        location: "Room 202",
        instructor: "Dr. Emma Wilson",
      },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      {
        id: "6",
        title: "Biology 105",
        start: "08:30",
        end: "10:00",
        location: "Room 103",
        instructor: "Prof. Fiona Green",
      },
      {
        id: "7",
        title: "Physics 202",
        start: "10:30",
        end: "12:00",
        location: "Room 204",
        instructor: "Prof. Bob Smith",
      },
      {
        id: "8",
        title: "Data Science 401",
        start: "15:00",
        end: "16:30",
        location: "Room 305",
        instructor: "Dr. George Hall",
      },
    ],
  },
  {
    day: "Thursday",
    classes: [
      {
        id: "9",
        title: "Psychology 101",
        start: "09:00",
        end: "10:30",
        location: "Room 104",
        instructor: "Dr. Hannah Lewis",
      },
      {
        id: "10",
        title: "Statistics 301",
        start: "11:00",
        end: "12:30",
        location: "Room 306",
        instructor: "Dr. Ian White",
      },
      {
        id: "11",
        title: "Machine Learning 501",
        start: "13:30",
        end: "15:00",
        location: "Lab 401",
        instructor: "Dr. Julie Martinez",
      },
    ],
  },
  {
    day: "Friday",
    classes: [
      {
        id: "14",
        title: "Computer Networks",
        start: "08:00",
        end: "09:30",
        location: "Room 109",
        instructor: "Prof. Sarah Green",
      },
      {
        id: "15",
        title: "Database Systems",
        start: "10:00",
        end: "11:30",
        location: "Room 208",
        instructor: "Mr. Mike Brown",
      },
    ],
  },
];

export default function ScheduleScreen() {
  const [viewMode, setViewMode] = useState("Weekly");
  const [selectedDate] = useState(new Date().toISOString());
  const currentDayName = format(parseISO(selectedDate), "EEEE");

  const isCurrentDay = (day) => day === currentDayName;

  return (
    <div className="container mx-auto px-4">
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <button className="px-4 py-2 bg-gray-200 text-gray-800 border rounded">
          241
        </button>
        <h1 className="text-xl font-semibold">Schedule</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
          +
        </button>
      </header>

      <section className="p-4 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-5xl">{format(parseISO(selectedDate), "dd")}</h2>
            <p>{currentDayName}</p>
            <p>{format(parseISO(selectedDate), "MMMM yyyy")}</p>
          </div>
          <button
            onClick={() =>
              setViewMode(viewMode === "Today" ? "Weekly" : "Today")
            }
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {viewMode === "Today" ? "Weekly" : "Today"}
          </button>
        </div>
      </section>

      {viewMode === "Weekly" ? (
        <section className="grid grid-cols-7 gap-4 p-4 bg-gray-50">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className={`p-4 border rounded-lg ${
                isCurrentDay(day) ? "bg-blue-100 border-blue-500" : "bg-white"
              }`}
            >
              <h3
                className={`font-bold mb-2 ${
                  isCurrentDay(day) ? "text-blue-500" : "text-gray-700"
                }`}
              >
                {day}
              </h3>
              {EVENTS.find((event) => event.day === day)?.classes.map((cls) => (
                <div
                  key={cls.id}
                  className={`p-2 mb-2 rounded ${
                    isCurrentDay(day) ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  <h4>{cls.title}</h4>
                  <p>
                    {cls.start} - {cls.end}
                  </p>
                  <p>{cls.location}</p>
                  <p>{cls.instructor}</p>
                </div>
              )) || <p className="text-sm text-gray-500">No classes today</p>}
            </div>
          ))}
        </section>
      ) : (
        <section className="p-4">
          <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
          {EVENTS.find((event) => event.day === currentDayName)?.classes.map(
            (cls) => (
              <div
                key={cls.id}
                className="p-4 mb-4 bg-blue-500 text-white rounded"
              >
                <h4>{cls.title}</h4>
                <p>
                  {cls.start} - {cls.end}
                </p>
                <p>{cls.location}</p>
                <p>{cls.instructor}</p>
              </div>
            )
          ) || <p className="text-gray-500">No classes today</p>}
        </section>
      )}
    </div>
  );
}
