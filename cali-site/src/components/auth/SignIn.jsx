import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ShinyButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          initial={{ "--x": "100%", scale: 1 }}
          animate={{ "--x": "-100%" }}
          whileTap={{ scale: 0.97 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1,
            type: "spring",
            stiffness: 20,
            damping: 15,
            mass: 2,
            scale: {
              type: "spring",
              stiffness: 10,
              damping: 5,
              mass: 0.1,
            },
          }}
          className="px-6 py-2 rounded-md relative radial-gradient "
        >
          <span className="relative rounded-full px-3 py-1.5 text-sm font-medium text-white transition focus-visible:outline-2 linear-mask">
            Sign in
          </span>
          <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] mx-auto mt-10">
        <DialogHeader>
          <DialogTitle className="text-center w-full">Sign In</DialogTitle>
          <DialogDescription className="text-center w-full">
            Enter your credentials to sign in.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" placeholder="your-email@example.com" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" type="password" placeholder="Your password" className="col-span-3" />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-600 text-center"> Don&apos;t have an account? <a href="#" className="text-primary underline">Create one</a>
          </p>
          <Button variant="ringHover" type="submit">Sign In</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShinyButton;
