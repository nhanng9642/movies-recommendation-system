/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export function NotificationRequestLogin( {open, handleOpen, redirect}) {
 
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Please login to do this function.</DialogHeader>
        <DialogBody>
          <p>
            You need to login to do this function. Please login to continue.
          </p>
        </DialogBody>
        <DialogFooter>
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            <Button variant="gradient" color="green">
                <span>Login</span>
            </Button>
          </Link>
        </DialogFooter>
      </Dialog>
    </>
  );
}