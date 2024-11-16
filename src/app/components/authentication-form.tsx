"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import AuthenticationError from "./authentication-error";
import { LoginSchema } from "../utils/schemas";
import { login } from "../actions/user.actions";
import { LoaderButton } from "./loader-button";

const AuthenticationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    message: "",
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      setIsLoading(true);
      const result = await login(values);
      if (result?.error) {
        setError({
          state: true,
          message: result.error,
        });
      }
    } catch (error: any) {
      setError({
        state: true,
        message: error.message as string,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[500px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="user" autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            {error.state && <AuthenticationError message={error.message} />}
          </CardContent>
          <CardFooter className="flex justify-between">
            <LoaderButton
              isLoading={isLoading}
              className="w-full"
              type="submit"
            >
              Log In
            </LoaderButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AuthenticationForm;
