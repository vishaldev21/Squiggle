import ChatCard from "./ChatCard";

function Chat() {
  return (
    <div className="w-1/2 h-full relative">
      <div className="h-[80%] overflow-auto space-y-2 p-2">
        <ChatCard message="hey" />
        <ChatCard message="hey" />
        <ChatCard message="hey" />
        <ChatCard message="hey" />
        <ChatCard message="hey" />
        <ChatCard message="hey" />
        <ChatCard message="hey" />
        <ChatCard message="hey" />
        <ChatCard message="hey" />
        <ChatCard message="hey" />
        <ChatCard message="hey" />
        <ChatCard message="hey" />
      </div>
      <div className="bottom-3 absolute w-full flex justify-center">
        <input
          type="text"
          placeholder="Enter your message"
          className="input w-3/4 mx-auto"
          required
        />
      </div>
    </div>
  );
}

export default Chat;
