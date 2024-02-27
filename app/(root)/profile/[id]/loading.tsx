import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className=" mb-10 flex h-36 w-full items-center gap-5 ">
        <Skeleton className=" h-36 w-36 rounded-full bg-gray-200" />
        <Skeleton className="h-24 w-4/6 rounded-md bg-gray-200" />
        <Skeleton className=" h-10 w-32 self-start rounded-md bg-gray-200" />
      </div>

      <div className=" flex flex-col">
        <Skeleton className="h-10 w-20 items-start  rounded-md bg-gray-200" />

        <div className=" mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
          <Skeleton className="h-28  rounded-md bg-gray-200" />
          <Skeleton className="h-28  rounded-md bg-gray-200" />
          <Skeleton className="h-28  rounded-md bg-gray-200" />
          <Skeleton className="h-28  rounded-md bg-gray-200" />
        </div>
      </div>

      <div className=" mt-10 flex gap-10">
        <div className=" flex flex-1 flex-col">
          <div className=" flex">
            <Skeleton className="h-11  w-24  rounded-r-none bg-gray-200" />
            <Skeleton className="h-11 w-24 rounded-r-none bg-gray-200" />
          </div>

          <div className=" mt-5 flex w-full flex-col gap-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton
                key={item}
                className=" h-48 w-full rounded-xl bg-gray-200 "
              />
            ))}
          </div>
        </div>

        <div className="flex min-w-[278px] flex-col max-lg:hidden">
          <Skeleton className="h-7 w-10  bg-gray-200" />

          <div className=" mt-7  flex flex-col gap-4">
            <Skeleton className="h-7  bg-gray-200" />
            <Skeleton className="h-7 bg-gray-200" />
            <Skeleton className="h-7 bg-gray-200" />
            <Skeleton className="h-7 bg-gray-200" />
            <Skeleton className="h-7 bg-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
