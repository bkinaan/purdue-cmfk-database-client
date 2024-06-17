"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";

import axios from "axios";
import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
} from "react";

const StaffRoles = [
  { label: "President", value: "President" },
  { label: "VP Programming", value: "VP Programming" },
  { label: "VP Activity Planning", value: "VP Activity Planning" },
  { label: "VP Fundraising", value: "VP Fundraising" },
  { label: "VP Engagement", value: "VP Engagement" },
  { label: "General Manager", value: "General Manager" },
  { label: "Engagement Manager", value: "Engagement Manager" },
  { label: "Activity Director", value: "Activity Director" },
  { label: "Fundraising Director", value: "Fundraising Director" },
];

const formSchema = z.object({
  username: z.string().min(1),
  FirstName: z.string().min(1),
  LastName: z.string().min(1),
  EmailAddress: z.string().min(1),
  StaffRole: z.string({ required_error: "Please select a staff role" }),
  PairedWith: z.string().min(0),
});

type Mentor = {
  id: number;
  username: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  StaffRole: string;
  PairedWith: string;
};

type EditFormProps = {
  mentor: Mentor;
};

export default function EditForm({ mentor }: EditFormProps) {
  const [BuddyList, setBuddyList] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const fetchBuddyList = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await axios.get(
          "http://localhost:8080/api/v1/notpairedbuddies",
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );
        setBuddyList(
          response.data.map((buddy: { FirstName: any; LastName: any }) => {
            const combinedName = `${buddy.FirstName} ${buddy.LastName}`;
            console.log(combinedName);
            return { label: combinedName, value: combinedName };
          })
        );
      } catch (e) {
        console.error("something went wrong", e);
      }
    };
    fetchBuddyList();
  }, []);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: mentor.username,
      FirstName: mentor.FirstName,
      LastName: mentor.LastName,
      EmailAddress: mentor.EmailAddress,
      StaffRole: mentor.StaffRole || "",
      PairedWith: mentor.PairedWith || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    // send updated mentor to server
    const api = "http://localhost:8080/api/v1";
    const id = mentor.id;
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.put(`${api}/mentors/${id}`, values, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log(response);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="FirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="LastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="EmailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="StaffRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staff Role</FormLabel>
              <div></div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between"
                        // !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? StaffRoles.find(
                            (StaffRole) => StaffRole.value === field.value
                          )?.label
                        : "Select staff role"}
                      <CaretSortIcon className="text-grey ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {StaffRoles.map((StaffRole) => (
                        <CommandItem
                          value={StaffRole.label}
                          key={StaffRole.value}
                          onSelect={() => {
                            form.setValue("StaffRole", StaffRole.value);
                          }}
                        >
                          {StaffRole.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              StaffRole.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* <FormControl>
                <Input
                  placeholder=""
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="PairedWith"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paired With</FormLabel>
              <div></div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between"
                        // !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? BuddyList?.find(
                            (Buddy: { value: string }) =>
                              Buddy.value === field.value
                          )?.label
                        : "Select little buddy"}
                      <CaretSortIcon className="text-grey ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {BuddyList.map(
                        (Buddy: {
                          label: string;
                          value: Key | null | undefined;
                        }) => (
                          <CommandItem
                            value={Buddy.label || ""}
                            key={Buddy.value}
                            onSelect={() => {
                              form.setValue("PairedWith", String(Buddy.value));
                            }}
                          >
                            {Buddy.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                Buddy.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        )
                      )}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* <FormControl>
                <Input
                  placeholder=""
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage /> */}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
