import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/Context/userContext";
import { LogoutButton } from "./LogoutButton";
import { Separator } from "@radix-ui/react-separator";
export const UserCard = () => {
  const { user } = useUser();
  return (
    <div>
      <Avatar>
        <AvatarImage src={user?.user_metadata.picture} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Separator />
      <LogoutButton />
    </div>
  );
};
