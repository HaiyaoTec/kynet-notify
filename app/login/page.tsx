import { title } from "@/components/primitives";
import {Input} from "@nextui-org/input";
import {LockFilledIcon, MailIcon} from "@nextui-org/shared-icons";
import React from "react";
import {Link} from "@nextui-org/link";

export default function AboutPage() {
	return (
		<div>
			<h1 className={title({color: 'violet'})}>skynet-notify</h1>
      <Input
        autoFocus
        endContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
      />
      <Input
        endContent={<LockFilledIcon/>}
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="bordered"
      />
		</div>
	);
}
