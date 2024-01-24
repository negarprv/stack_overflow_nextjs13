import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  textStyle: string;
  value: string | number;
  href?: string;
  alt: string;
  isAuthor?: boolean;
  title: string;
}

const Metric = ({
  imgUrl,
  textStyle,
  alt,
  title,
  value,
  href,
  isAuthor,
}: MetricProps) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        height={16}
        width={16}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />

      <p className={`${textStyle} flex items-center gap-1`}>
        {value}

        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className=" flex-center gap-1">
        {metricContent}
      </Link>
    );
  }

  return (
    <div className=" flex-center flex flex-wrap gap-1">{metricContent}</div>
  );
};

export default Metric;
