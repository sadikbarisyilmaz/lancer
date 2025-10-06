"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useEdgeStore } from "@/lib/edgestore";
// import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Member name must be at least 3 characters."),
  email: z.string().email("Please enter a valid email."),
});

// import { updateUser, updateUserImage } from "@/actions/userActions";
import { useToast } from "../ui/use-toast";
import { ServerSession } from "@/types/next-auth";
import { updateUser } from "@/app/actions";

export const EditUserForm = ({ user }: ServerSession) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropzoneWidth, setDropzoneWidth] = useState(400); // Default width

  const [file, setFile] = useState();
  // const { edgestore } = useEdgeStore();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  // const updateDropzoneWidth = () => {
  //   const viewportWidth = window.innerWidth;
  //   const minWidth = 200;
  //   const maxWidth = 400;

  //   if (viewportWidth < 500) {
  //     const responsiveWidth = Math.max(minWidth, viewportWidth * 0.7); // Calculate 80% of viewport width or minWidth
  //     setDropzoneWidth(Math.min(responsiveWidth, maxWidth)); // Ensure width does not exceed maxWidth
  //   } else {
  //     setDropzoneWidth(maxWidth); // For larger screens, use maxWidth
  //   }
  // };

  // useEffect(() => {
  //   updateDropzoneWidth();
  //   window.addEventListener("resize", updateDropzoneWidth);
  //   return () => window.removeEventListener("resize", updateDropzoneWidth);
  // }, []);

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    const result = await updateUser(values);
    // if (file) {
    //   handlePicture();
    // }
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error !",
        description: `- ${result.error}`,
      });

      setIsSubmitting(false);
    } else {
      toast({
        title: "Update Successful !",
      });
      setIsSubmitting(false);
    }
  };

  // const handlePicture = async () => {
  //   if (file) {
  //     const res = await edgestore.publicFiles.upload({
  //       file,
  //       onProgressChange: (progress) => {
  //         // you can use this to show a progress bar
  //         console.log(progress);
  //       },
  //     });
  //     // you can run some server action or api here
  //     // to add the necessary data to your database
  //     console.log("handlePicture-res.url: ", res.url);
  //     // setImgUrl(res.url);
  //     handleUpdatePicture(res.url);
  //   }
  // };

  // const handleUpdatePicture = async (imgUrl) => {
  //   const result = await updateUserImage(imgUrl, user.id, user.role);

  //   // console.log("handlePicture: ", file);
  //   // console.log("handlePicture: ", imgUrl);

  //   if (result.error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error !",
  //       description: `- ${result.error}`,
  //     });
  //   } else {
  //   }
  // };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-3xl font-semibold md:text-start text-center">
        Edit User Info
      </h2>
      <Separator />
      <div className="flex flex-col gap-2 max-w-2xl">
        <div className="flex-col flex gap-3">
          <Label className="text-lg" htmlFor="fullName">
            User Image
          </Label>
          {/* 
          <div className="flex items-center justify-center gap-4 ">
            <div className="flex flex-col justify-between w-full gap-2">
              <div className="flex w-full justify-center md:justify-start">
                <SingleImageDropzone
                  width={dropzoneWidth}
                  height={100}
                  value={file}
                  dropzoneOptions={{
                    maxSize: 1024 * 1024 * 2, // 2MB
                    maxFiles: 1,
                  }}
                  onChange={(file) => {
                    setFile(file);
                  }}
                />
              </div>
              {!isSubmitting ? (
                <Button onClick={handlePicture}>Update Image</Button>
              ) : (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </div>
          </div>
           */}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!isSubmitting ? (
              <Button className="w-full mt-2" type="submit">
                Submit
              </Button>
            ) : (
              <Button className="w-full mt-2" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

// "use client";
// import { Pencil } from "lucide-react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Separator } from "../ui/separator";
// import { Button } from "../ui/button";
// import { useEffect, useState } from "react";
// import {
//   readUserSession,
//   updateUserEmail,
//   updateUserFullName,
//   updateUserPassword,
//   uploadUserImage,
// } from "@/app/actions";
// import { useToast } from "../ui/use-toast";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Loader } from "../Loader";

// export const EditUserForm = () => {
//   const [activeForm, setActiveForm] = useState({
//     name: false,
//     email: false,
//     password: false,
//   });

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [picture, setPicture] = useState("");
//   const [file, setFile] = useState<any>(undefined);
//   const [password, setPassword] = useState("");
//   const [passwordCheck, setPasswordCheck] = useState("");

//   const [user, setUser] = useState<any>(null);

//   const { toast } = useToast();

//   const activateForm = (e: React.SyntheticEvent<HTMLOrSVGElement>) => {
//     let value = e.currentTarget.dataset.label;
//     switch (value) {
//       case "name":
//         activeForm.name
//           ? setActiveForm({
//               ...activeForm,
//               name: false,
//             })
//           : setActiveForm({
//               ...activeForm,
//               name: true,
//             });
//         break;
//       case "email":
//         activeForm.email
//           ? setActiveForm({
//               ...activeForm,
//               email: false,
//             })
//           : setActiveForm({
//               ...activeForm,
//               email: true,
//             });
//         break;
//       case "password":
//         activeForm.password
//           ? setActiveForm({
//               ...activeForm,
//               password: false,
//             })
//           : setActiveForm({
//               ...activeForm,
//               password: true,
//             });
//         break;
//     }
//   };

//   const getUser = async () => {
//     const {
//       data: { session },
//     } = await readUserSession();
//     if (session) {
//       setUser(session.user);
//     }
//   };
//   useEffect(() => {
//     getUser();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       setName(user.user_metadata.full_name);
//       setEmail(user.email);
//     }
//   }, [user]);

//   const handleName = (e: React.SyntheticEvent<EventTarget>) => {
//     e.preventDefault();
//     updateUserFullName(name);
//     setActiveForm({ ...activeForm, name: false });
//     getUser();
//     toast({
//       title: `- Name changed successfully !`,
//     });
//   };
//   const handlePassword = (e: React.SyntheticEvent<EventTarget>) => {
//     e.preventDefault();
//     if (password === passwordCheck) {
//       updateUserPassword(password);
//       toast({
//         title: `- Password set successfully !`,
//       });
//     } else {
//       toast({
//         title: `- Passwords does not match !`,
//       });
//     }
//   };
//   const handlePicture = (e: React.SyntheticEvent<EventTarget>) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("img", file[0]);
//     uploadUserImage(formData);
//     getUser();

//     toast({
//       title: `- Profile Picture set successfully !`,
//     });
//   };
//   const handleEmail = (e: React.SyntheticEvent<EventTarget>) => {
//     e.preventDefault();
//     updateUserEmail(email);
//     getUser();
//     toast({
//       title: `- A comfirmation mail sent to your current mail adress !`,
//     });
//   };

//   if (user === null) {
//     return (
//       <span className="w-full h-full min-h-[300px] grid items-center justify-center">
//         <Loader />
//       </span>
//     );
//   }

//   return (
//     <div className="dark:bg-[#2424247c]/60 p-8 items-center gap-10 justify-center text-lg flex flex-wrap w-full md:w-fit h-fit rounded-lg animate-fadeIn">
//       <div
//         className={`grid grid-cols-1 ${
//           user.user_metadata.iss === "https://accounts.google.com"
//             ? ""
//             : "lg:grid-cols-2"
//         }   items-center gap-2 justify-center`}
//       >
//         <div className="flex flex-col  w-full gap-2 sm:p-4">
//           <div className="flex flex-col h-full text-center justify-center gap-6 pb-6">
//             <div className="flex w-full justify-center">
//               <Avatar className="lg:w-36 w-16 md:w-24 lg:h-36 h-16 md:h-24 flex flex-col self-center">
//                 <AvatarImage
//                   src={user.user_metadata.avatar_url}
//                   alt={user.user_metadata.full_name}
//                   className="flex justify-center w-full"
//                 />
//                 <AvatarFallback>
//                   {user.user_metadata.full_name
//                     ? user.user_metadata.full_name.charAt(0).toUpperCase()
//                     : ""}
//                 </AvatarFallback>
//               </Avatar>
//             </div>
//             <h2 className="text-3xl">{user.user_metadata.full_name}</h2>
//           </div>
//           <h3 className="sm:text-2xl">Edit User Info</h3>
//           <Separator className=" bg-foreground/10" />
//           <div className="flex flex-col sm:flex-row gap-2 sm:items-center ">
//             <span className="flex justify-between items-center">
//               <Label htmlFor="name">Name:</Label>
//               <Button
//                 onClick={(e) => activateForm(e)}
//                 data-label="name"
//                 variant="ghost"
//                 size="icon"
//                 className="flex sm:hidden"
//               >
//                 <Pencil className="w-full" size={18} />
//               </Button>
//             </span>
//             <span className="flex items-center justify-between w-full">
//               {!activeForm.name ? (
//                 <span className="animate-fadeIn break-words">
//                   {user.user_metadata.full_name}
//                 </span>
//               ) : (
//                 <form onSubmit={handleName} className="flex animate-fadeIn ">
//                   <Input
//                     onChange={(e) => setName(e.target.value)}
//                     value={name}
//                     type="text"
//                     required
//                   />
//                   <Button type="submit" variant="ghost">
//                     Save
//                   </Button>
//                 </form>
//               )}
//               <Button
//                 onClick={(e) => activateForm(e)}
//                 data-label="name"
//                 variant="ghost"
//                 size="icon"
//                 className="hidden sm:flex"
//               >
//                 <Pencil className="w-full" size={18} />
//               </Button>
//             </span>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2 sm:items-center ">
//             <span className="flex justify-between items-center">
//               <Label htmlFor="email">Email:</Label>
//               <Button
//                 onClick={(e) => activateForm(e)}
//                 data-label="email"
//                 variant="ghost"
//                 size="icon"
//                 className="flex sm:hidden"
//               >
//                 <Pencil className="w-full" size={18} />
//               </Button>
//             </span>
//             <span className="flex items-center justify-between w-full">
//               {!activeForm.email ? (
//                 <span className="animate-fadeIn break-words min-w-[100px] sm:min-w-none">
//                   {user.email}
//                 </span>
//               ) : (
//                 <form onSubmit={handleEmail} className="flex animate-fadeIn ">
//                   <Input
//                     onChange={(e) => setEmail(e.target.value)}
//                     value={email}
//                     type="email"
//                     required
//                   />
//                   <Button type="submit" variant="ghost">
//                     Save
//                   </Button>
//                 </form>
//               )}
//               <Button
//                 onClick={(e) => activateForm(e)}
//                 data-label="email"
//                 variant="ghost"
//                 size="icon"
//                 className="hidden sm:flex"
//               >
//                 <Pencil className="w-full" size={18} />
//               </Button>
//             </span>
//           </div>
//         </div>
//         <Separator className="my-4 bg-foreground/10 lg:hidden" />
//         {user.user_metadata.iss !== "https://accounts.google.com" && (
//           <div className="flex flex-col gap-2 sm:p-4 w-full">
//             <div className="flex flex-col gap-4  ">
//               <h2 className="sm:text-2xl">Change Profile Picture</h2>
//               <Separator className=" bg-foreground/10" />
//               <form
//                 onSubmit={handlePicture}
//                 className="flex flex-col gap-2 w-full animate-fadeIn "
//               >
//                 <Input
//                   onChange={(e) => {
//                     setPicture(e.target.value);
//                     setFile(e.target.files);
//                   }}
//                   value={picture}
//                   required
//                   type="file"
//                 />

//                 <Button type="submit" variant="ghost">
//                   Save
//                 </Button>
//               </form>
//             </div>
//             <div className="flex flex-col gap-4 ">
//               <h2 className="sm:text-2xl">Change Password</h2>
//               <Separator className=" bg-foreground/10" />
//               <Label htmlFor="name">Password</Label>
//               <form
//                 onSubmit={handlePassword}
//                 className="flex flex-col gap-2 w-full animate-fadeIn "
//               >
//                 <Input
//                   onChange={(e) => setPassword(e.target.value)}
//                   value={password}
//                   type="password"
//                   required
//                 />
//                 <Label htmlFor="name">Rewrite Password</Label>
//                 <Input
//                   onChange={(e) => setPasswordCheck(e.target.value)}
//                   value={passwordCheck}
//                   type="password"
//                   required
//                 />
//                 <Button type="submit" variant="ghost">
//                   Save
//                 </Button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
