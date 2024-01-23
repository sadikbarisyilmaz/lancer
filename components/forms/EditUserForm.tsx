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
  uploadUserImage,
} from "@/app/actions";
import { useToast } from "../ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Loading from "@/app/home/account/loading-component";

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
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState<any>(undefined);
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
    // setEmail(user.user_metadata.email);
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

  const handlePicture = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", file[0]);
    uploadUserImage(formData);
    toast({
      title: `- Profile Picture set successfully !`,
    });
  };

  // const handleEmail = (e: React.SyntheticEvent<EventTarget>) => {
  //   e.preventDefault();
  //   updateUserEmail(email);
  //   console.log("update name");
  // };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="bg-background/60 p-10 gap-2 text-lg grid lg:grid-cols-2 w-full md:w-fit h-fit rounded-md">
      <div className="flex flex-col h-full text-center gap-6 justify-center pb-2">
        <div className="flex w-full justify-center">
          <Avatar className="lg:w-24 w-16 lg:h-24 h-16 flex flex-col self-center">
            <AvatarImage
              src={user.user_metadata.avatar_url}
              alt={user.user_metadata.full_name}
              className="flex justify-center w-full"
            />
            <AvatarFallback>
              {user?.user_metadata.full_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-3xl">{user.user_metadata.full_name}</h2>
      </div>
      <div className="grid gap-2">
        <h3 className="sm:text-2xl">Edit User Info</h3>
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
          <h2 className="sm:text-2xl">Change Password</h2>
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
        {user.user_metadata.iss !== "https://accounts.google.com" && (
          <>
            <Separator className=" bg-foreground/10" />
            <div className="flex flex-col gap-4 min-w-96 md:w-96 ">
              <h2>Change Profile Picture</h2>
              <span className="flex items-center justify-between w-full">
                <form
                  onSubmit={handlePicture}
                  className="flex flex-col gap-2 w-full animate-fadeIn "
                >
                  <Input
                    onChange={(e) => {
                      setPicture(e.target.value);
                      setFile(e.target.files);
                    }}
                    value={picture}
                    required
                    type="file"
                  />

                  <Button type="submit" variant="ghost">
                    Save
                  </Button>
                </form>
              </span>
            </div>
          </>
        )}
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
    </div>
  );
};
