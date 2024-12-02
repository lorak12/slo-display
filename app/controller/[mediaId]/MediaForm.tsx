"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { updateMedia, updateMediaPlaceholder } from "@/actions/mediaActions";
import { Media } from "../columns";
import { useRouter } from "next/navigation";

// Define the Zod schema
const mediaSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  url: z.string().url({ message: "A valid URL is required." }),
  type: z.enum(["IMAGE", "AUDIO", "VIDEO"], {
    message: "Select a valid type.",
  }),
  placeholder: z.boolean().default(false),
});

type MediaFormValues = z.infer<typeof mediaSchema>;

export default function MediaForm({ initialData }: { initialData: Media }) {
  const router = useRouter();
  // Initialize the form
  const form = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      name: initialData.name,
      url: initialData.url,
      type: initialData.type,
      placeholder: initialData.placeholder,
    },
  });

  // Handle form submission
  const onSubmit = async (values: MediaFormValues) => {
    if (initialData.placeholder == values.placeholder) {
      await updateMedia(
        initialData.id,
        values.url,
        values.type,
        initialData.active,
        values.placeholder,
        values.name
      );
    } else {
      await updateMediaPlaceholder(initialData.id, values.placeholder);
      await updateMedia(
        initialData.id,
        values.url,
        values.type,
        initialData.active,
        values.placeholder,
        values.name
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Button onClick={() => router.back()}>Powrót</Button>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Media name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the media.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* URL Field */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/media" {...field} />
              </FormControl>
              <FormDescription>Provide the media URL.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type Field */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value as "IMAGE" | "AUDIO" | "VIDEO")
                  }
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IMAGE">Image</SelectItem>
                    <SelectItem value="AUDIO">Audio</SelectItem>
                    <SelectItem value="VIDEO">Video</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Choose the media type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Placeholder Checkbox */}
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Placeholder</FormLabel>
                <FormDescription>
                  Jeśli tak to jest aktywnym placeholderem
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
