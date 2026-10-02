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
      showNotification("Blog created", "success");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Create a New Blog
          </h2>

          <form action={formAction} className="space-y-5">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                type="text"
                name="title"
                id="title"
                defaultValue={state.values.title}
                placeholder="Enter blog title"
                className="
                  w-full
                  rounded-xl
                  border border-gray-300
                  px-4 py-2.5
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200
                "
              />
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Author
              </label>

              <input
                type="text"
                name="author"
                id="author"
                defaultValue={state.values.author}
                placeholder="Enter author name"
                className="
                  w-full
                  rounded-xl
                  border border-gray-300
                  px-4 py-2.5
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200
                "
              />
            </div>

            {/* URL */}
            <div>
              <label
                htmlFor="url"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                URL
              </label>

              <input
                type="url"
                name="url"
                id="url"
                defaultValue={state.values.url}
                placeholder="https://example.com"
                className="
                  w-full
                  rounded-xl
                  border border-gray-300
                  px-4 py-2.5
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200
                "
              />
            </div>

            {/* Likes */}
            <div>
              <label
                htmlFor="likes"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Likes
              </label>

              <input
                type="number"
                name="likes"
                id="likes"
                min="0"
                defaultValue={state.values.likes}
                className="
                  w-full
                  rounded-xl
                  border border-gray-300
                  px-4 py-2.5
                  text-gray-900
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              data-testid="create-blog-button"
              className="
                w-full
                rounded-xl
                bg-blue-500
                px-5 py-2.5
                font-semibold
                text-white
                transition
                hover:bg-blue-600
                active:scale-[0.98]
                focus:outline-none
                focus:ring-2
                focus:ring-blue-300
                focus:ring-offset-2
              "
            >
              Create Blog
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddBlog;
