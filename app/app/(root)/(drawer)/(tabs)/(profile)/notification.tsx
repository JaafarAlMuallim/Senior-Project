import SwitchOption from "@/components/SwitchOption";
import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    generalNotification: false,
    vibrate: false,
    appUpdates: false,
    newFeatureUpdates: false,
    autoUpdates: false,
    widgetSupport: false,
    screenTimeTracker: false,
    newServiceAvailable: false,
    newTipsAvailable: false,
  });

  const toggleSwitch = (key: keyof typeof settings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  return (
    <ScrollView className="flex-1 p-4 bg-primary-white">
      <View className="border-b py-2 border-primary-black">
        <Text className="text-lg font-bold mt-3 mb-2 text-primary-black">
          Common
        </Text>
        <SwitchOption
          label="General Notification"
          value={settings.generalNotification}
          onValueChange={() => toggleSwitch("generalNotification")}
        />
        <SwitchOption
          label="Vibrate"
          value={settings.vibrate}
          onValueChange={() => toggleSwitch("vibrate")}
        />
      </View>
      <View className="border-b py-2 border-primary-black">
        <Text className="text-lg font-bold mt-3 mb-2 text-primary-black">
          System & services update
        </Text>
        <SwitchOption
          label="App updates"
          value={settings.appUpdates}
          onValueChange={() => toggleSwitch("appUpdates")}
        />
        <SwitchOption
          label="New feature updates"
          value={settings.newFeatureUpdates}
          onValueChange={() => toggleSwitch("newFeatureUpdates")}
        />
        <SwitchOption
          label="Auto updates"
          value={settings.autoUpdates}
          onValueChange={() => toggleSwitch("autoUpdates")}
        />
        <SwitchOption
          label="Widget support"
          value={settings.widgetSupport}
          onValueChange={() => toggleSwitch("widgetSupport")}
        />
        <SwitchOption
          label="User screen time tracker"
          value={settings.screenTimeTracker}
          onValueChange={() => toggleSwitch("screenTimeTracker")}
        />
      </View>
      <Text className="text-lg font-bold mt-6 mb-3 text-primary-black">
        Others
      </Text>
      <SwitchOption
        label="New Service Available"
        value={settings.newServiceAvailable}
        onValueChange={() => toggleSwitch("newServiceAvailable")}
      />
      <SwitchOption
        label="New Tips Available"
        value={settings.newTipsAvailable}
        onValueChange={() => toggleSwitch("newTipsAvailable")}
      />
    </ScrollView>
  );
};

export default NotificationSettings;
