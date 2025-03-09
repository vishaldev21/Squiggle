function ChatCard({
  message,
  declaration,
  user,
}: {
  message: string;
  declaration: boolean;
  user: string;
}) {
  return (
    <div className="flex gap-1 bg-base-300 p-1">
      {declaration ? "" : <p className="text-sm">{`${user}:`}</p>}
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default ChatCard;
