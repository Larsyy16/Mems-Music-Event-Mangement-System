"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { eventFormSchema } from "@/lib/validator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Textarea } from "../ui/textarea";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "./Dropdown";
import { IEvent } from "@/lib/database/models/event.model";
import { createEvent } from "@/lib/actions/event.actions";
import { useRouter } from "next/navigation";

type EventformProps = {
  userId: string;
  type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventformProps) => {
  //File uploader
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const initialValues = eventDefaultValues;
  // console.log(eventDefaultValues);
  const router = useRouter();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // console.log(userId);
  

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // console.log(values);
    // console.log(type);

    let uploadedImageUrl = '';

    try {
      // ... (existing code)

      // console.log(event, eventId, userId)
      // S3 image uploader

      if (!file) {
        alert("Please select a file to upload.");
        return;
      }

      setUploading(true);

      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/s3",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        },
      );
      // console.log(file.name, file.type)
      if (response.ok) {
        const { url, fields } = await response.json();
        // console.log(url, fields)
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string);
          // console.log(key)
          // console.log(value)
        });
        formData.append("file", file);
        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });
        if (uploadResponse.ok) {
          uploadedImageUrl = url + fields.key

          
        } else {
          console.error("S3 Upload Error:", uploadResponse);
          alert("Upload failed.");
        }
      } else {
        alert("Failed to get pre-signed URL.");
      }

      setUploading(false);

      //createEvent submission

      if (type === "Create") {
        const val = { ...values };
        try {
          const newEvent = await createEvent({
            event: { ...values, imageUrl:uploadedImageUrl },
            userId,
            path: "/profile",
          });
          if (newEvent) {
            form.reset();
            router.push(`/events/${newEvent._id}`);
          }
        } catch (createEventError) {
          console.log("Error in createEvent:", createEventError);
        }
      }
    } catch (onSubmitError) {
      console.error("Error in onSubmit:", onSubmitError);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mx-3"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    eventChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className=" gap-5">
                <FormControl className="h-60 gap-5">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 ">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="gap-5">
                <FormControl className="">
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        setFile(files[0]);
                      }
                    }}
                    accept="image/png, image/jpeg"
                    className="input-field gap-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center bg-grey-50 rounded-2xl overflow-hidden">
                    {/* flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 */}
                    <Image
                      src="/assets/icons/location-grey.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="ml-4"
                    />

                    <Input
                      placeholder="Event location or Online"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-2xl bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      Start Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-2xl bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      End Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-2xl bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="dollar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="input-field p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-50"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full rounded-2xl">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-2xl bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="link"
                      width={24}
                      height={24}
                    />

                    <Input
                      placeholder="URL"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex-center">
          <Button
            type="submit"
            size="sm"
            disabled={form.formState.isSubmitting}
            className="button w-1/2"
          >
            Create Event
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
