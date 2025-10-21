'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/state/schemas/schemas';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import fetchApi from '@/state/query/fetchApi';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation'




type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {


  const {status,data: session} = useSession()

  const router = useRouter()



  const [showPassword, setShowPassword] = useState(false);
  const [getError,setError] = useState('')

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: LoginFormValues) => {
    startTransition(() => {
     fetchApi({
        method: 'Post', 
        url: '/auth/login',
        data: values
      })
        .then((data) => {
        
        if(data.status !== 200){
          setError('Invalid Email or Password')
        }
        else if(data.status === 200){
          router.push('/dashboard')
        }
        })
        .catch((err) => console.log(err))
    });
  };





  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-700">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password with toggle */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="********"
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-3">


              <div className="mt-6 w-full text-center">

                {isPending ? (<BeatLoader />) : getError? <div className="bg-red-500 w-full text-white text-center py-2 rounded-[8px] px-10">{getError}</div> : ''}
              </div>


              <Button type="submit" className="w-full">
                Sign In
              </Button>


              <div className="flex justify-between w-full text-sm text-gray-500">
                {/* <a href="#" className="hover:underline">
                  Forgot password?
                </a> */}
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
