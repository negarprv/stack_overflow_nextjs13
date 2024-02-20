"use server";

import Question from "@/database/question.model";
import { connectToDB } from "../mongoose";
import { SearchParams } from "./shared.types";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import Answer from "@/database/answer.mode";

const searchableTypes = ["question", "answer", "user", "tag"];

export async function globalSearch(params: SearchParams) {
  try {
    connectToDB();

    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Question, searchFiled: "title", type: "question" },
      { model: Tag, searchFiled: "name", type: "tag" },
      { model: User, searchFiled: "name", type: "user" },
      { model: Answer, searchFiled: "content", type: "answer" },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !searchableTypes.includes(typeLower)) {
      for (const { model, searchFiled, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchFiled]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchFiled],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);

      if (!modelInfo) {
        throw new Error("invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({
          [modelInfo.searchFiled]: regexQuery,
        })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchFiled],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
            ? item.question
            : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(`error fetching global results, ${error}`);
    throw error;
  }
}
