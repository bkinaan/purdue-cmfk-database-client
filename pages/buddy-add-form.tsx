"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

import axios from "axios";

const Schools = [
  { label: "Glen Acres Elementary", value: "Glen Acres" },
  { label: "Earhart Elementary", value: "Earhart" },
  { label: "Miami Elementary", value: "Miami" },
  { label: "Vinton Elementary", value: "Vinton" },
  { label: "Sunnyside Intermediate", value: "Sunnyside" },
];

const GradeLevels = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
];

const formSchema = z.object({
  FirstName: z.string().min(1),
  LastName: z.string().min(1),
  School: z.string({ required_error: "Please select a school" }),
  GradeLevel: z.string({ required_error: "Please select a grade level" }),
});

export default function AddForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      School: "",
      GradeLevel: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    // send updated mentor to server
    const api = "http://localhost:8080/api/v1";
    // const id = buddy.id;
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.post(`${api}/buddies/`, values, {
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
          name="School"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School</FormLabel>
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
                        ? Schools.find((School) => School.value === field.value)
                            ?.label
                        : "Select school"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search school..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {Schools.map((School) => (
                        <CommandItem
                          value={School.label}
                          key={School.value}
                          onSelect={() => {
                            form.setValue("School", School.value);
                          }}
                        >
                          {School.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              School.value === field.value
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="GradeLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
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
                        ? GradeLevels.find(
                            (GradeLevel) => GradeLevel.value === field.value
                          )?.label
                        : "Select grade level"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search grade level..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {GradeLevels.map((GradeLevel) => (
                        <CommandItem
                          value={GradeLevel.label}
                          key={GradeLevel.value}
                          onSelect={() => {
                            form.setValue("GradeLevel", GradeLevel.value);
                          }}
                        >
                          {GradeLevel.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              GradeLevel.value === field.value
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
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
