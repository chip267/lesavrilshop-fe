"use client";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserService } from "@/services/user.service";
import { showToast } from "@/components/ui/toast/toasts";
import { format } from "date-fns";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Mail, Lock, CalendarIcon } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  birthday: z.date().optional(),
  avatarFile: z.any().optional(),
});

export default function PersonalDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userService = new UserService();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      avatarFile: undefined,
    },
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await userService.getCurrentUser();
        if (response.success && response.data) {
          const user = response.data;
          form.reset({
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthday: user.birthday ? new Date(user.birthday) : undefined,
          });
          setAvatarPreview(user.avatar || null);
        }
      } catch (error) {
        showToast.error("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("avatarFile", file);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      if (data.birthday) {
        formData.append("birthday", data.birthday.toISOString());
      }
      if (data.avatarFile) {
        formData.append("avatarFile", data.avatarFile);
      }

      const response = await userService.updateUser(formData);

      if (response.success) {
        showToast.success("Profile updated successfully");
      } else {
        showToast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      showToast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-medium">Personal details</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Avatar Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-[100px] h-[100px] rounded-full bg-gray-200" />
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Change photo
              </Button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12" disabled={isSaving} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone</FormLabel>
                  <div className="flex gap-4">
                    <Input
                      value="+84"
                      className="h-12 w-24"
                      readOnly
                      disabled={isSaving}
                    />
                    <Input
                      {...field}
                      className="h-12 flex-1"
                      disabled={isSaving}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Birthday Field with Date Picker */}
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Birthday</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] h-12 pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Account Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Account information</h3>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6" />
                        <span>{field.value}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="hover:bg-transparent"
                      >
                        Change
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-4">
                  <Lock className="h-6 w-6" />
                  <span>Password</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="hover:bg-transparent"
                >
                  Change
                </Button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            className="bg-black hover:bg-black/90 h-12"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "SAVE"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
