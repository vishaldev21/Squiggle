function ChatCard({ message }: { message: string }) {
  return (
    <div className="flex gap-1 bg-base-300 p-1">
      <p className="text-sm">User:</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default ChatCard;
