import { extractFragmentReplacements } from "prisma-binding";
import Query from "./Query";
import User from "./User";
import Mutation from "./Mutation";
import Video from "./Video";
import Comment from "./Comment";

const resolvers = {
  Query,
  Mutation,
  User,
  Video,
  Comment
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
