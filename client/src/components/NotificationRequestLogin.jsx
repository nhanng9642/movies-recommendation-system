/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export function NotificationRequestLogin( {open, handleOpen}) {
 
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
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <Link to="/login">
              <span>Confirm</span>
            </Link>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}