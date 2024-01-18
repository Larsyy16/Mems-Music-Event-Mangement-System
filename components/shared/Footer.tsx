import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
            className="w-1/4 h-auto"
          />
        </Link>

        <p> 2024 Larsyy16. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
