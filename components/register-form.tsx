"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

interface IFormInput {
  name: String;
  email: String;
  password: String;
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  // Destructure to avoid Framer Motion / HTML type conflicts
  const { onAnimationStart, onDragStart, onDragEnd, onDrag, ...safeProps } =
    props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
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
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  const mysubmithandler: SubmitHandler<IFormInput> = async (data) => {
    // toast.success("register succesfully", { position: "top-right" });
    // console.log(data);
    setProcessing(true);
    const objdata: IFormInput = {
      email: data.email,
      name: data.name,
      password: data.password,
    };
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(objdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resmessage = await res.json();
      console.log(resmessage);
      if (resmessage.status === 500) {
        if (resmessage?.error?.errorResponse?.code === 11000) {
          toast.error(
            `${resmessage?.error?.errorResponse?.keyValue?.email} this user is already exist`,
            {
              position: "top-right",
            },
          );
        } else {
          toast.error(resmessage?.msg, {
            position: "top-right",
          });
        }
      } else if (resmessage.status === 200) {
        toast.error(resmessage?.msg, {
          position: "top-right",
        });
        setTimeout(() => {
          router.push("/login");
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
      {...safeProps}
      onSubmit={handleSubmit(mysubmithandler)}
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-2 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Join ResuMi and start building your career today
        </p>
      </motion.div>

      <div className="grid gap-4">
        <motion.div variants={itemVariants} className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            // required
            className="focus-visible:ring-primary"
            {...register("name", {
              required: true,
              maxLength: 50,
              minLength: 2,
            })}
          />
          {errors.name && (
            <span className="font-normal text-xs text-red-600">
              {errors.name.type === "minLength" &&
                "Name is minimum 2 character long"}
              {errors.name.type === "maxLength" &&
                "Name is maximum 50 character long"}
              {errors.name.type === "required" && "Name is required"}
            </span>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="focus-visible:ring-primary"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="font-normal text-xs text-red-600">
              {errors.email.message}
            </span>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="focus-visible:ring-primary"
            {...register("password", {
              required: "password is required",
              minLength: 6,
              maxLength: 8,
            })}
          />
          {errors.password && (
            <span className="font-normal text-xs text-red-600">
              {errors.password.type === "minLength" &&
                "password is minimum 6 character long"}
              {errors.password.type === "maxLength" &&
                "password is maximum 8 character long"}
              {errors.password.type === "required" && "password is required"}
            </span>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="pt-2">
          {processing ? (
            <Button variant="secondary" className="w-full shadow-lg shadow-primary/20 active:scale-[0.98] transition-all border py-2 rounded-[6px] border-gray-900/40 bg-gray-500/60 text-white hover:text-black" disabled>
              Get Started
              <Spinner data-icon="inline-start" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full shadow-lg shadow-primary/20 active:scale-[0.98] transition-all border py-2 rounded-[6px] border-gray-900/40 bg-gray-500/60 text-white hover:text-black"
            >
              Get Started
            </Button>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative text-center text-xs uppercase"
        >
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or register with
          </span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button variant="outline" type="button" className="w-full group">
            <svg
              className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12"
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Sign In
        </Link>
      </motion.div>
    </motion.form>
  );
}
