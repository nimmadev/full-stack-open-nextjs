"use client";
import { createBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

const AddBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    values: { title: "", author: "", url: "", likes: 0 },
  });
  return (
    <div>
      <h2>create a new blog</h2>
      <form action={formAction}>
        <div>
          <label htmlFor="title">
            title
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={state.values.title}
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            author
            <input
              type="text"
              name="author"
              id="author"
              defaultValue={state.values.author}
            />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            url
            <input
              type="text"
              name="url"
              id="url"
              defaultValue={state.values.url}
            />
          </label>
        </div>
        <div>
          <label htmlFor="likes">
            likes
            <input
              type="number"
              name="likes"
              id="likes"
              defaultValue={state.values.likes}
            />
          </label>
        </div>
        <button type="submit">create</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};

export default AddBlog;
