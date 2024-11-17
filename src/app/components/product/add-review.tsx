import { ReviewSchema } from "@/app/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { LoaderButton } from "../loader-button";
import { ReviewDto } from "@/app/product/[productId]/page";
import ReviewStarRating from "../review-start-rating";

interface AddReviewProps {
  setIsAddingReview: any;
  setReviews: any;
}

const AddReview: React.FC<AddReviewProps> = ({
  setIsAddingReview,
  setReviews,
}) => {
  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      reviewerName: "",
      reviewerMail: "",
      comment: "",
      date: new Date(),
      rating: "0",
    },
  });

  const onSubmit = async (values: z.infer<typeof ReviewSchema>) => {
    const newReview = {
      ...values,
      rating: Number(values.rating),
    };

    setReviews((currentReviews: ReviewDto[]) => [...currentReviews, newReview]);
    setIsAddingReview(false);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-6 p-3 border rounded-md">
            <div className="flex flex-col gap-4 w-[300px]">
              <FormField
                control={form.control}
                name="reviewerMail"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@mail.com"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reviewerName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="flex flex-col h-full">
                    <FormLabel>Comment</FormLabel>
                    <FormControl className="flex-1 space-y-2">
                      <Textarea
                        placeholder="This product is awesome!"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[300px]">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Rate the product</FormLabel>
                    <FormControl>
                      <ReviewStarRating field={field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setIsAddingReview(false)}>
              <X /> Cancel
            </Button>
            <LoaderButton isLoading={false}>Submit</LoaderButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddReview;
