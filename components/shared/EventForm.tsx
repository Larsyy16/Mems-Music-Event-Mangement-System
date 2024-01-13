"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { eventFormSchema } from "@/lib/validator"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { eventDefaultValues } from "@/constants"
import Image from "next/image"
import { Checkbox } from "../ui/checkbox"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Textarea } from "../ui/textarea"
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "./Dropdown"


const EventForm = () => {

  const initialValues = eventDefaultValues;

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
    
  })
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mx-3">
        <div className="flex flex-col md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-center bg-grey-50 rounded-full overflow-hidden">
                <FormControl>
                  <Input placeholder="Event title" {...field} className="textarea rounded-2xl" />
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
                  eventChangeHandler={field.onChange} value={field.value}
                   />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>




        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
           Create Event
          </Button>
      </form>
    </Form>
  )
}

export default EventForm