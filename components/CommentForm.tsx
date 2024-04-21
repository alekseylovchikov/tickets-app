"use client";

import { commentSchema } from "@/ValidationSchemas/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Ticket } from "@prisma/client";
import axios from "axios";
import { text } from "stream/consumers";

type CommentFormData = z.infer<typeof commentSchema>;

const CommentForm = ({ ticketId }: { ticketId: Ticket["id"] }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  async function onSubmit(values: z.infer<typeof commentSchema>) {
    try {
      setIsSubmitting(true);
      setError("");

      await axios.post("/api/comments", { ...values, ticketId });

      form.reset();

      setIsSubmitting(false);

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
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Comment text..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit">
            Add comment
          </Button>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
    </div>
  );
};

export default CommentForm;
