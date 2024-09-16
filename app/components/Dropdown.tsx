import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { ReactNode, useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react-native";

type OptionItem = {
  value: string;
  label: string;
};

interface DropdownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
  icon?: ReactNode;
  label: string;
}

const Dropdown = ({
  data,
  onChange,
  placeholder,
  icon,
  label,
}: DropdownProps) => {
  const [expanded, setExpanded] = useState(false);

  const [curr, setCurr] = useState<OptionItem | null>();

  const buttonRef = useRef<View>(null);

  const toggleExpanded = useCallback(() => {
    if (buttonRef.current) {
      buttonRef.current.measure((fx, fy, width, height, px, py) => {
        setTop(py + height + 5); // Get the y-coordinate and add the button's height to position the dropdown below it
      });
    }
    setExpanded(!expanded);
  }, [expanded]);

  const [top, setTop] = useState(0);

  const onSelect = useCallback((item: OptionItem) => {
    onChange(item);
    setCurr(item);
    setExpanded(false);
  }, []);
  return (
    <View className="flex flex-col h-28">
      <CustomText styles="text-lg text-black-default mb-2">{label}</CustomText>
      <View ref={buttonRef}>
        <TouchableOpacity
          className={cn(
            "h-14 flex flex-row justify-between items-center px-4 border rounded-lg",
            expanded ? "border-blue-600" : "",
          )}
          activeOpacity={0.8}
          onPress={toggleExpanded}
        >
          {icon ? icon : null}
          <CustomText
            styles={`ml-4 text-lg flex-1  ${curr?.label ? "" : "text-gray-400 font-poppinsItalic"}`}
          >
            {curr?.label || placeholder}
          </CustomText>
          <ChevronsUpDown />
        </TouchableOpacity>
        {expanded ? (
          <Modal visible={expanded} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
              <View className="w-full flex flex-1 justify-center items-center px-4">
                <View
                  style={{ position: "absolute", top: top }}
                  className={cn(
                    "p-2 w-full h-[175px] bg-white rounded-lg border bg-white-default",
                  )}
                >
                  <FlatList
                    keyExtractor={(item) => item.value}
                    data={data}
                    ItemSeparatorComponent={() => (
                      <View className="border-0.5 border-black flex flex-row w-full self-center opacity-50" />
                    )}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        className={cn(
                          "h-10 flex justify-start items-start bg-white flex-row py-1.5 rounded-md",
                          item.value === curr?.value ? "bg-zinc-200" : "",
                        )}
                        onPress={() => onSelect(item)}
                      >
                        <View className="flex flex-row justify-center items-center">
                          <Check
                            color={
                              item.value === curr?.value ? "blue" : "white"
                            }
                          />
                          <CustomText styles="ml-4 text-lg text-left flex">
                            {item.label}
                          </CustomText>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        ) : null}
      </View>
    </View>
  );
};
export default Dropdown;
