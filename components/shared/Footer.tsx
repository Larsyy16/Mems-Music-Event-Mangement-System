import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="wrapper flex-between flex-col gap-4 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>

        <p className="text-white"> 2024 Larsyy16. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
