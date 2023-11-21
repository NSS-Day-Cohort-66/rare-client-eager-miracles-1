import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { CategoryList } from "../components/categories/CategoryList";
import { PostList } from "../components/posts/PostList";
import { PostDetail } from "../components/posts/PostDetails";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/" element={<PostList />} />
          <Route path="/:postId" element={<PostDetail />} />

          <Route
            path="/categories"
            element={<CategoryList setToken={setToken} />}
          />
        </Route>
      </Routes>
    </>
  );
};
