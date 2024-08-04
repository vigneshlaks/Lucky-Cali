import CardWrapper from "./CardWrapper"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from "../../../../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api";
import { useNavigate } from 'react-router-dom';

const RegisterCard = () => {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      const response = api.post('/user/register', data);
      console.log("Server response", response);
      navigate('/auth/login');
    } catch {
      console.log("Error sending information");
    }
  };

  return (
    <CardWrapper
      label="Create an Account"
      title="Register"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account? Login Here."
      content={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="bg-black text-white" />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" className="bg-black text-white" />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
            </div>
            <FormItem className="flex justify-center">
              <Button type="submit" variant="ringHover" className="mt-4">Register</Button>
            </FormItem>
          </form>
        </Form>
      }
      className="bg-gray-800 text-white"
    />
  );
}

export default RegisterCard;
