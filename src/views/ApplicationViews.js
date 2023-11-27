import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { CategoryList } from "../components/categories/CategoryList";
import { PostList } from "../components/posts/PostList";
import { PostDetail } from "../components/posts/PostDetails";
import { CreatePostForm } from "../components/posts/CreatePostForm";
import { AllTags } from "../components/tags/AllTags";
import { MyPostList } from "../components/posts/MyPosts";

export const ApplicationViews = ({
  token,
  setToken,
  userId,
  setCurrentUserId,
}) => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Login setToken={setToken} setCurrentUserId={setCurrentUserId} />
          }
        />
        <Route
          path="/register"
          element={
            <Register setToken={setToken} setCurrentUserId={setCurrentUserId} />
          }
        />
        <Route element={<Authorized token={token} userId={userId} />}>
          <Route path="/" element={<PostList />} />
          <Route path="/allposts" element={<PostList />} />
          <Route path="/:postId" element={<PostDetail />} />
          <Route path="/create" element={<CreatePostForm />} />
          <Route path="/tags" element={<AllTags />} />
          <Route path="/myposts" element={<MyPostList />} />

          <Route
            path="/categories"
            element={<CategoryList setToken={setToken} />}
          />
        </Route>
      </Routes>
    </>
  );
};
