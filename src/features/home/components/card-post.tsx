import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CardPostProps extends React.ComponentProps<"div"> {
  username?: string;
  avatarUrl?: string;
  content?: string;
  date?: string;
}

export default function CardPost({
  username,
  avatarUrl,
  content,
  date,
  ...props
}: CardPostProps) {
  return (
    <div className="w-full space-y-4 p-4" {...props}>
      <div className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src={avatarUrl} alt="user avatar" />
          <AvatarFallback>
            {username ? username.slice(0, 2).toUpperCase() : "NA"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-sm">{username}</h3>
          <p className="text-xs text-muted-foreground">@{username}</p>
        </div>
      </div>

      <div className="text-sm">{content}</div>

      <div className="flex justify-end">
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}
