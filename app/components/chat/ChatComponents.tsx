import { ChatActions } from "./ChatActions";
import { ChatBubble, ChatTime } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { ChatSendButton } from "./ChatSendButton";

export const ChatComponents = ({ handlers, state, uploaders }) => ({
  renderBubble: ChatBubble,
  renderTime: ChatTime,
  renderInputToolbar,
  renderComposer: (props) => (
    <ChatInput
      {...props}
      text={state.text}
      setText={handlers.setText}
      isRecording={state.isRecording}
      recordingDuration={state.recordingDuration}
      stopRecording={handlers.stopRecording}
      openImagePicker={uploaders.openImagePicker}
      setIsFocused={handlers.setIsFocused}
    />
  ),
  renderSend: (props) => (
    <ChatSendButton
      {...props}
      isFocused={state.isFocused}
      isRecording={state.isRecording}
      text={state.text}
      chatId={state.chatId}
      mutate={handlers.mutate}
      startRecording={handlers.startRecording}
    />
  ),
  renderActions: (props) => (
    <ChatActions 
      {...props} 
      openImagePicker={uploaders.openImagePicker}
      openDocumentPicker={uploaders.openDocumentPicker}
    />
  ),
}); 