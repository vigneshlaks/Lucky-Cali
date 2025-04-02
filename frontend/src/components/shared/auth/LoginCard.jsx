import React from 'react';
import CardWrapper from "./CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import api from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginSchema } from "../../../../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./AuthProvider";

const LoginCard = () => {
  const { setToken } = useAuth(); 
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  });

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/user/login', data);

      if (response?.data?.accessToken) {
        setToken(response.data.accessToken); 
      }

      const from = location.state?.from?.pathname || '/train/';
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error sending information:", error);
    }
  };

  return (
    <CardWrapper
      label="Login to your account"
      title="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register here."
      content={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Username</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" className="bg-black text-white" />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" className="bg-black text-white" />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
            </div>
            <FormItem className="flex justify-center">
              <Button type="submit" variant="ringHover" className="mt-4">
                Login
              </Button>
            </FormItem>
          </form>
        </Form>
      }
      className="bg-gray-800 text-white"
    />
  );
};

export default LoginCard;
