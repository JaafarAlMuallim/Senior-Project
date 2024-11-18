import { Bubble, BubbleProps, IMessage, Time, TimeProps } from "react-native-gifted-chat";

export const ChatBubble = (props: BubbleProps<IMessage>) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: "#002EB8",
        },
        right: {
          backgroundColor: "#4561FF",
        },
      }}
      textStyle={{
        left: {
          color: "#fff",
          fontFamily: "PoppinsRegular",
        },
        right: {
          color: "#fff",
          fontFamily: "PoppinsRegular",
        },
      }}
    />
  );
};

export const ChatTime = (props: TimeProps<IMessage>) => {
  return (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: "#fff",
        },
        right: {
          color: "#fff",
        },
      }}
    />
  );
}; 