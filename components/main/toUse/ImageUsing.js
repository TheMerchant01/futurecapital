import Image from "next/image";
import React from "react";

export default function ImageUsing() {
  return (
    <div className="mt-8">
      <div className="lg-version hidden md:block">
        <Image
          alt=""
          src="/assets/toUse.png"
          width={2000}
          height={2000}
          className="w-full h-full"
        />
      </div>
      <div className="mobile-verson hidden px-10">
        <Image
          alt=""
          src="/assets/mobiletoUse1.png"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
        <Image
          alt=""
          src="/assets/mobiletoUse2.png"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
        <Image
          alt=""
          src="/assets/mobiletoUse3.png"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
