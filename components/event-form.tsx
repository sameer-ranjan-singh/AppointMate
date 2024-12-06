"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { eventSchema } from "@/app/lib/validators";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { createEvent } from "@/actions/events";
import useFetch from "@/hooks/use-fetch";
import { useRouter } from "next/navigation";

const EventForm = ({ onSubmitForm }: { onSubmitForm: any }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
      title: "",
      description: "",
    },
  });
 const {loading,error, data, fn:fnCreateEvent} = useFetch(createEvent)

  const onSubmit = async (data:any) => {
    console.log(data)
    await fnCreateEvent(data)
    if(!loading && !error){
      router.refresh()
      onSubmitForm()
    }

    
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-5 flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Event Title
        </label>
        <Input id="title" className="mt-1" {...register("title")} />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title?.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Event description
        </label>
        <Input id="description" className="mt-1" {...register("description")} />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">
            {errors.description?.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="duration" className="text-sm font-medium text-gray-700">
          Duration (minutes)
        </label>
        <Input
          id="duration"
          type="number"
          className="mt-1"
          {...register("duration", { valueAsNumber: true })}
        />
        {errors.duration && (
          <p className="text-red-600 text-sm mt-1">
            {errors.duration?.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="isPrivate"
          className="text-sm font-medium text-gray-700"
        >
          Event Privacy
        </label>
        <Controller
          name="isPrivate"
          control = {control}
          render={({field})=> (
            <Select
            value={field.value ? "true" : "false"}
            onValueChange={(value) => field.onChange(value === "true")}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>

        )}
        />

        {errors.isPrivate && (
          <p className="text-red-600 text-sm mt-1">
            {errors.isPrivate?.message}
          </p>
        )}
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-1">
          Failed to create event !
          {/* {error.message} */}
        </p>
      )}
      <Button disabled={loading}>
        {loading ? "Adding..." : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;
