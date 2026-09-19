import { createBlog } from "@/app/actions/blogs";

const AddBlog = () => {
  return (
    <div>
      <h2>create a new blog</h2>
      <form action={createBlog}>
        <div>
          <label htmlFor="title">
            title
            <input type="text" name="title" id="title" />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            author
            <input type="text" name="author" id="author" />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            url
            <input type="text" name="url" id="url" />
          </label>
        </div>
        <div>
          <label htmlFor="likes">
            likes
            <input type="number" name="likes" id="likes" />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AddBlog;
