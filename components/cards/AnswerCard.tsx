import { getTimeStamp, formatNumber } from "@/lib/utils";

import Metric from "../shared/Metric";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface QuestionProps {
  clerkId?: string | null;
  _id: string;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: number;
  question: { title: string; _id: string };
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  author,
  question,
  createdAt,
  upvotes,
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className=" card-wrapper rounded-[10px] p-9 px-11  "
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>

          <h3 className=" sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className=" flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user avatar"
          value={author.name}
          title={` - asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyle="body-medium text-dark400_light700"
        />

        <div className=" flex-center gap-3 ">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatNumber(upvotes)}
            title=" Votes"
            textStyle="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
