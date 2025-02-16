"use client";
import Image from "next/image";
import { Button } from "@material-tailwind/react";

export function FixedPlugin() {
  return (
    <a href="https://samueltetteh.netlify.app/" target="_blank">
      <Button
        color="white"
        size="sm"
        className="!fixed bottom-4 right-4 flex gap-1 pl-2 items-center border border-blue-gray-50"
      >
        <Image
          width={128}
          height={128}
          className="w-5 h-5"
          alt="Lynx"
          src="https://samueltetteh.netlify.app/static/media/logoDark.aa5b846a8282a664eace.png"
        />{" "}
        Made With 💖 by Samuel Tetteh
      </Button>
    </a>
  );
}
