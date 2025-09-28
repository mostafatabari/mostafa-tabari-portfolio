import MessagePopup from "./MessagePopup";

interface MessagePopupListProps {
  messages: string[];
  setMessages: (messages: string[]) => void; // Now using setter directly
}

/* Only the latest message is kept, previous messages are cleared */
const MessagePopupList = ({ messages, setMessages }: MessagePopupListProps) => {
  const latestMessage = messages[messages.length - 1];

  if (!latestMessage) return null;

  return (
    <MessagePopup
      key={latestMessage}
      message={latestMessage}
      onClose={() => setMessages([])} // Remove message completely after fade
    />
  );
};

export default MessagePopupList;