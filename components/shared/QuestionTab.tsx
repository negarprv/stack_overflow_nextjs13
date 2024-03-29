import { getUserQuestion } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestion({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <div className=" mt-5 flex flex-col gap-3">
        {result.questions.map((question) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            clerkId={clerkId}
            title={question.title}
            tags={question.tags}
            answers={question.answers}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            createdAt={question.createdAt}
          />
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

export default QuestionTab;
