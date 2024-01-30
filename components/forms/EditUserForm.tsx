"use client";
import { Pencil } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  readUserSession,
  updateUserEmail,
  updateUserFullName,
  updateUserPassword,
  uploadUserImage,
} from "@/app/actions";
import { useToast } from "../ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader } from "../Loader";

export const EditUserForm = () => {
  const [activeForm, setActiveForm] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState<any>(undefined);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [user, setUser] = useState<any>(null);

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

  const getUser = async () => {
    const {
      data: { session },
    } = await readUserSession();
    if (session) {
      setUser(session.user);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.user_metadata.full_name);
      setEmail(user.email);
    }
  }, [user]);

  const handleName = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    updateUserFullName(name);
    setActiveForm({ ...activeForm, name: false });
    getUser();
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
    getUser();

    toast({
      title: `- Profile Picture set successfully !`,
    });
  };
  const handleEmail = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    updateUserEmail(email);
    getUser();
    toast({
      title: `- A comfirmation mail sent to your current mail adress !`,
    });
  };

  if (user === null) {
    return (
      <span className="w-full h-full min-h-[300px] grid items-center justify-center">
        <Loader />
      </span>
    );
  }

  return (
    <div className="dark:bg-[#2424247c]/60 p-8 items-center gap-10 justify-center text-lg flex flex-wrap w-full md:w-fit h-fit rounded-lg animate-fadeIn">
      <div
        className={`grid grid-cols-1 ${
          user.user_metadata.iss === "https://accounts.google.com"
            ? ""
            : "lg:grid-cols-2"
        }   items-center gap-2 justify-center`}
      >
        <div className="flex flex-col  w-full gap-2 sm:p-4">
          <div className="flex flex-col h-full text-center justify-center gap-6 pb-6">
            <div className="flex w-full justify-center">
              <Avatar className="lg:w-36 w-16 md:w-24 lg:h-36 h-16 md:h-24 flex flex-col self-center">
                <AvatarImage
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.full_name}
                  className="flex justify-center w-full"
                />
                <AvatarFallback>
                  {user.user_metadata.full_name
                    ? user.user_metadata.full_name.charAt(0).toUpperCase()
                    : ""}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-3xl">{user.user_metadata.full_name}</h2>
          </div>
          <h3 className="sm:text-2xl">Edit User Info</h3>
          <Separator className=" bg-foreground/10" />
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center ">
            <span className="flex justify-between items-center">
              <Label htmlFor="name">Name:</Label>
              <Button
                onClick={(e) => activateForm(e)}
                data-label="name"
                variant="ghost"
                size="icon"
                className="flex sm:hidden"
              >
                <Pencil className="w-full" size={18} />
              </Button>
            </span>
            <span className="flex items-center justify-between w-full">
              {!activeForm.name ? (
                <span className="animate-fadeIn break-words">
                  {user.user_metadata.full_name}
                </span>
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
                className="hidden sm:flex"
              >
                <Pencil className="w-full" size={18} />
              </Button>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center ">
            <span className="flex justify-between items-center">
              <Label htmlFor="email">Email:</Label>
              <Button
                onClick={(e) => activateForm(e)}
                data-label="email"
                variant="ghost"
                size="icon"
                className="flex sm:hidden"
              >
                <Pencil className="w-full" size={18} />
              </Button>
            </span>
            <span className="flex items-center justify-between w-full">
              {!activeForm.email ? (
                <span className="animate-fadeIn break-words min-w-[100px] sm:min-w-none">
                  {user.email}
                </span>
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
                className="hidden sm:flex"
              >
                <Pencil className="w-full" size={18} />
              </Button>
            </span>
          </div>
        </div>
        <Separator className="my-4 bg-foreground/10 lg:hidden" />
        {user.user_metadata.iss !== "https://accounts.google.com" && (
          <div className="flex flex-col gap-2 sm:p-4 w-full">
            <div className="flex flex-col gap-4  ">
              <h2 className="sm:text-2xl">Change Profile Picture</h2>
              <Separator className=" bg-foreground/10" />
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
            </div>
            <div className="flex flex-col gap-4 ">
              <h2 className="sm:text-2xl">Change Password</h2>
              <Separator className=" bg-foreground/10" />
              <Label htmlFor="name">Password</Label>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
