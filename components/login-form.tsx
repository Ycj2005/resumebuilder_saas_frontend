"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

interface IFormInput {
  email: String;
  password: String;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  // 1. Destructure the conflicting props out of 'props'
  // We extract these so they don't get spread onto motion.form
  const { onAnimationStart, onDragStart, onDragEnd, onDrag, ...safeProps } =
    props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };
  const loginhandler: SubmitHandler<IFormInput> = async (data) => {
    setProcessing(true);
    const objdata: IFormInput = {
      email: data.email,
      password: data.password,
    };
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(objdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resmessage = await res.json();
      console.log(resmessage);
      if (resmessage.status === 401) {
        setProcessing(false);

        toast.error(resmessage?.msg, {
          position: "top-right",
        });
      } else if (resmessage.status === 200) {
        setProcessing(false);
        toast.success(resmessage?.msg, {
          position: "top-right",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error) {
      toast.error("not reigster", {
        position: "top-right",
      });
    }
  };

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-col gap-6", className)}
      {...safeProps} // 2. Use safeProps here instead of props
      onSubmit={handleSubmit(loginhandler)}
    >
      <div className="grid gap-6">
        <div className="flex flex-col space-y-2 text-center md:text-center">
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <motion.div variants={itemVariants} className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="focus-visible:ring-primary"
            {...register("email", {
              required: "email is required",
              maxLength: 70,
              minLength: 2,
            })}
          />
          {errors.email && (
            <span className="font-normal text-xs text-red-600">
              {errors?.email?.type === "required" && "Email is required"}
              {errors?.email?.type === "maxLength" &&
                "Email is maximum 70 charachter long"}
              {errors?.email?.type === "minLength" &&
                "Email must be 2 character long"}
            </span>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="focus-visible:ring-primary"
            {...register("password", {
              required: "password is required",
              maxLength: 8,
              minLength: 6,
            })}
          />
          {errors.password && (
            <span className="font-normal text-xs text-red-600">
              {errors?.password?.type === "required" && "Password is required"}
              {errors?.password?.type === "maxLength" &&
                "password is maximum 8 charachter long"}
              {errors?.password?.type === "minLength" &&
                "Enter password minium 6 character long"}
            </span>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          {processing ? (
            <Button
              variant="secondary"
              className="w-full shadow-lg shadow-primary/20 active:scale-[0.98] transition-all border py-2 rounded-[6px] border-gray-900/40 bg-gray-500/60 text-white hover:text-black"
              disabled
            >
              Login.. &nbsp;
              <Spinner data-icon="inline-start" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant={"ghost"}
              className="w-full shadow-sm active:scale-[0.98] transition duration-200 border border-black bg-black text-white rounded-md"
            >
              Login
            </Button>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative text-center text-sm"
        >
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button variant="outline" type="button" className="w-full group">
            {/* Icon SVG remains the same */}
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-2.108 4.072-1.348 1.064-3.324 1.828-5.732 1.828-4.524 0-8.232-3.644-8.232-8.1s3.708-8.1 8.232-8.1c2.42 0 4.264.94 5.548 2.156l2.312-2.312C18.424 1.488 15.82 0 12.48 0 6.48 0 1.608 4.872 1.608 10.88s4.872 10.88 10.872 10.88c3.34 0 5.856-1.1 7.824-3.148 2.032-2.032 2.672-4.88 2.672-7.232 0-.468-.036-.912-.108-1.328z"
                fill="currentColor"
              />
            </svg>
            Google
          </Button>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </motion.div>
    </motion.form>
  );
}
