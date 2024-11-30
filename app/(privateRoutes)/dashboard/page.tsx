"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/lib/validators";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import { updateUsername } from "@/actions/users";
import { BarLoader } from "react-spinners";


type formValues = {
  username : string | null | undefined
}
const Dashboard = () => {
  const { isLoaded, user } = useUser();
  const { 
    register,
    handleSubmit,
    setValue,
    formState: {errors} ,
  } = useForm<formValues>({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() => {
    setValue("username", user?.username);
  }, [isLoaded]);

  const {loading, error, data, fn:fnUpdateUsername} = useFetch(updateUsername)

  const onsubmit = async (data:any) => {
    fnUpdateUsername(data.username)
    console.log(data)
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName}</CardTitle>
        </CardHeader>
        {/*TODO : Latest updates - upcoming calls */}
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span>{window?.location.origin}</span>
                <Input {...register("username")} placeholder="username" />
              </div>
              {errors.username && (
                <p className="text-red-600 text-sm mt-1">{errors.username?.message}</p>
              )}
              {error && (
                <p className="text-red-600 text-sm mt-1">{error?.message}</p>
              )}
            </div>
            {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>}
            <div className="text-end">
              <Button>Update Username</Button>
            </div>
          </form>
        </CardContent>
        {/*TODO : Latest updates - upcoming calls */}
      </Card>
    </div>
  );
};

export default Dashboard;
