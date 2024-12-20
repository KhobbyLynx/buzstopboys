"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";

const SPONSORS = [
  "lynx",
  "bioversity",
  "ci",
  "cirad",
  "giz",
  "ecoplanet",
];

export function SponsoredBy() {
  return (
    <section className="py-8 lg:py-20">
      <div className="container mx-auto text-center">
        <Typography variant="h6" color="blue-gray" className="mb-8">
          SPONSORED BY
        </Typography>
        <div className="flex flex-wrap items-center justify-center gap-20">
          {SPONSORS.map((logo, key) => (
            <Image
              width={60}
              height={60}
              key={key}
              src={`/image/partners/${logo}.svg`}
              alt={logo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsoredBy;
