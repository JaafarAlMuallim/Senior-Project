import React from "react";
import { View, Text, Switch } from "react-native";

const SwitchOption = ({
    label,
    value,
    onValueChange,
}: {
    label: string;
    value: boolean;
    onValueChange: () => void;
}) => {
    return (
        <View className="flex-row justify-between items-center">
            <Text>{label}</Text>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: "#D9D9D9", true: "#4561FF" }}
                thumbColor={"#FFF"}
            />
        </View>
    );
};

export default SwitchOption;
