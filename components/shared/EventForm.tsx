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
import FileUploader from "./FileUploader"


const EventForm = () => {


  //File uploader
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  

  const initialValues = eventDefaultValues;

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
    
  })
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {

    if(!file) {
      alert('Please select a file to upload.')
      return
    }

    setUploading(true)

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/s3',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type}),
      }
    )
      if (response.ok) {
        const { url, fields } = await response.json()

        const formData = new FormData() 
        Object.entries(fields).forEach(([key,value]) => {
          formData.append(key, value as string)
        })
        formData.append('file', file)
        const uploadResponse = await fetch(url, {
          method: 'POST',
          body: formData,
        })
        if (uploadResponse.ok) {
          alert('Upload successful!')
        } else {
          console.error('S3 Upload Error:', uploadResponse)
          alert('Upload failed.')
        }
      } else {
        alert('Failed to get pre-signed URL.')
      }
  
      setUploading(false)
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

        <div className="">


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
            const files = e.target.files
            if (files) {
              setFile(files[0])
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
    name="startDateTime"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormControl>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
              className="filter-grey"
            />
            <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
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
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
              className="filter-grey"
            />
            <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
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