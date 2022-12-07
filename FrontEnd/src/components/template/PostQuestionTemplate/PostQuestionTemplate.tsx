import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PostHeader from "@/components/main/Post/PostHeader";
import PostKeyword from "@/components/main/Post/PostKeyword";
import PostContent from "@/components/main/Post/PostContent";

interface PostQuestionTemplateProps {
  postKeywords: string[];
  addNewKeyword: (k: string) => void;
  removeKeyword: (k: string) => void;
  postContent: string;
  changeContentInput: (k: string) => void;
  postTitle: string;
  changeTitleInput: (k: string) => void;
  submitNewPost: () => any;
}

const PostQuestionTemplate = ({
  postKeywords,
  addNewKeyword,
  removeKeyword,
  postContent,
  changeContentInput,
  postTitle,
  changeTitleInput,
  submitNewPost
}: PostQuestionTemplateProps) => {
  return (
    <>
      <Navbar />
      <PostHeader postTitle={postTitle} changeTitleInput={changeTitleInput} submitNewPost={submitNewPost} />
      <PostKeyword postKeywords={postKeywords} addNewKeyword={addNewKeyword} removeKeyword={removeKeyword} />
      <PostContent changeContentInput={changeContentInput} />
      <Footer />
    </>
  );
};

export default PostQuestionTemplate;
