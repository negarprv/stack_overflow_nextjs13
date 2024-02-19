import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className=" mt-5 flex flex-col gap-3">
        {result.answers.map((answer) => (
          <>
            <AnswerCard
              key={answer._id}
              clerkId={clerkId}
              _id={answer._id}
              question={answer.question}
              author={answer.author}
              upvotes={answer.upvotes.length}
              createdAt={answer.createdAt}
            />
          </>
        ))}
      </div>

      <div className=" mt-10">
        <Pagination
          isNext={result.isNext}
          pageNumber={searchParams?.page ? +searchParams.page : 1}
        />
      </div>
    </>
  );
};

export default AnswersTab;
