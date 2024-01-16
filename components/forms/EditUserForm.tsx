"use client";
import { Pencil } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  updateUserEmail,
  updateUserFullName,
  updateUserPassword,
} from "@/app/actions";
import { useToast } from "../ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  user: User;
}
export const EditUserForm = ({ user }: Props) => {
  const [activeForm, setActiveForm] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { toast } = useToast();

  const activateForm = (e: React.SyntheticEvent<HTMLOrSVGElement>) => {
    let value = e.currentTarget.dataset.label;
    switch (value) {
      case "name":
        activeForm.name
          ? setActiveForm({
              ...activeForm,
              name: false,
            })
          : setActiveForm({
              ...activeForm,
              name: true,
            });
        break;
      case "email":
        activeForm.email
          ? setActiveForm({
              ...activeForm,
              email: false,
            })
          : setActiveForm({
              ...activeForm,
              email: true,
            });
        break;
      case "password":
        activeForm.password
          ? setActiveForm({
              ...activeForm,
              password: false,
            })
          : setActiveForm({
              ...activeForm,
              password: true,
            });
        break;
    }
  };
  useEffect(() => {
    setName(user.user_metadata.full_name);
    setEmail(user.user_metadata.email);
  }, []);

  const handleName = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    updateUserFullName(name);
    setActiveForm({ ...activeForm, name: false });
    toast({
      title: `- Name changed successfully !`,
    });
  };
  const handlePassword = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (password === passwordCheck) {
      updateUserPassword(password);
      toast({
        title: `- Password set successfully !`,
      });
    } else {
      toast({
        title: `- Passwords does not match !`,
      });
    }
  };
  // const handleEmail = (e: React.SyntheticEvent<EventTarget>) => {
  //   e.preventDefault();
  //   updateUserEmail(email);
  //   console.log("update name");
  // };

  return (
    <div className="bg-background/60 p-6 text-lg gap-5 grid rounded-md">
      <Avatar className="lg:w-24 w-16 lg:h-24 h-16 flex flex-col ">
        <AvatarImage
          src={user.user_metadata.picture}
          alt={user.user_metadata.full_name}
          className=""
        />
        <AvatarFallback>
          {user?.user_metadata.full_name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h2 className="text-3xl">{user.user_metadata.full_name}</h2>
      <h3 className="text-2xl">Edit User Info</h3>
      <Separator className=" bg-foreground/10" />
      <div className="flex gap-4 min-w-96 md:w-96 items-center">
        <Label htmlFor="name">Name:</Label>
        <span className="flex items-center justify-between w-full">
          {!activeForm.name ? (
            <p className="animate-fadeIn">{user.user_metadata.full_name}</p>
          ) : (
            <form onSubmit={handleName} className="flex animate-fadeIn ">
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
              />
              <Button type="submit" variant="ghost">
                Save
              </Button>
            </form>
          )}
          <Button
            onClick={(e) => activateForm(e)}
            data-label="name"
            variant="ghost"
            size="icon"
          >
            <Pencil className="w-full" size={18} />
          </Button>
        </span>
      </div>
      <Separator className=" bg-foreground/10" />
      <div className="flex flex-col gap-4 min-w-96 md:w-96 ">
        <h2>Change Password</h2>
        <Label htmlFor="name">Password</Label>
        <span className="flex items-center justify-between w-full">
          <form
            onSubmit={handlePassword}
            className="flex flex-col gap-2 w-full animate-fadeIn "
          >
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
            />
            <Label htmlFor="name">Rewrite Password</Label>
            <Input
              onChange={(e) => setPasswordCheck(e.target.value)}
              value={passwordCheck}
              type="password"
              required
            />
            <Button type="submit" variant="ghost">
              Save
            </Button>
          </form>
        </span>
      </div>
      {/* <div className="flex gap-4  items-center">
        <Label htmlFor="email">Email:</Label>
        <span className="flex justify-between w-full">
          {!activeForm.email ? (
            <p className="animate-fadeIn">{user.user_metadata.email}</p>
          ) : (
            <form onSubmit={handleEmail} className="flex animate-fadeIn ">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
              />
              <Button type="submit" variant="ghost">
                Save
              </Button>
            </form>
          )}
          <Button
            onClick={(e) => activateForm(e)}
            data-label="email"
            variant="ghost"
            size="icon"
          >
            <Pencil className="w-full" size={18} />
          </Button>
        </span>
      </div> */}

      {/* <div className="flex gap-4  items-center">
        <Label htmlFor="password">Password:</Label>
        <span className="flex justify-between w-full">
          {!activeForm.password ? (
            <p className="">*********</p>
          ) : (
            <form onSubmit={handleName} className="flex animate-fadeIn ">
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
              />
              <Button type="submit" variant="ghost">
                Save
              </Button>
            </form>
          )}
          <Button
            onClick={(e) => activateForm(e)}
            data-label="password"
            variant="ghost"
            size="icon"
          >
            <Pencil className="w-full" size={18} />
          </Button>
        </span>
      </div> */}

      {/* <div className="flex gap-4  items-center">
        <Label htmlFor="picture">Picture: </Label>
        <span className="flex justify-between w-full">
          <img
            src={user.user_metadata.picture}
            className="w-8 h-8 rounded-full"
          />
       
            <Pencil className="w-full" size={18} />
        </span>
        <Input id="picture" type="file" />
      </div> */}
    </div>
  );
};
