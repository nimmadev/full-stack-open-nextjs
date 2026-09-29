"use client";
import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationProvider";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const AddBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    values: { title: "", author: "", url: "", likes: 0 },
    success: false,
  });
  const { showNotification } = useNotification();
  const router = useRouter();
  useEffect(() => {
    if (state.success === false && state.error) {
      showNotification(state.error, "error");
    }
    if (state.success) {
      showNotification("blog created", "success");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

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
      </form>
    </div>
  );
};

export default AddBlog;
