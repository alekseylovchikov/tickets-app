"use client";

import { ticketSchema } from "@/ValidationSchemas/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Ticket } from "@prisma/client";

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
  ticket?: Ticket;
}

const TicketForm = ({ ticket }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true);
      setError("");

      if (ticket) {
        await axios.patch(`/api/tickets/${ticket.id}`, values);
      } else {
        await axios.post("/api/tickets", values);
      }

      setIsSubmitting(false);
      router.push("/cv");
      router.refresh();
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>CV title</FormLabel>
                <FormControl>
                  <Input placeholder="Title..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            name="description"
            defaultValue={ticket?.description}
            control={form.control}
            render={({ field }) => (
              <SimpleMdeReact placeholder="Place your CV here" {...field} />
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            {ticket ? "UPDATE CV" : "CREATE CV"}
          </Button>
        </form>
      </Form>
      <p className="tomato">{error}</p>
    </div>
  );
};

export default TicketForm;
