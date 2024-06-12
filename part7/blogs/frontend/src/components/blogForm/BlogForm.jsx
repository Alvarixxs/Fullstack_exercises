import { useField } from "../../hooks/index.js";
import { setNotification } from "../../store/notificationReducer.js";
import { useDispatch } from "react-redux";
import { createBlog } from "../../store/blogReducer.js";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

function BlogForm() {
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addBlog = (event) => {
    event.preventDefault();
    try {
      dispatch(
        createBlog({
          title: title.value,
          author: author.value,
          url: url.value,
        }),
      );
      dispatch(setNotification("a new blog has been created.", 5));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 5));
    }
    resetTitle();
    resetAuthor();
    resetUrl();
    toggleVisibility();
  };

  return visible ? (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            {...title}
            data-testid="title"
            name="Title"
            placeholder="write title here"
          />
        </div>
        <div>
          <TextField
            label="author"
            {...author}
            data-testid="author"
            name="Author"
            placeholder="write author here"
          />
        </div>
        <div>
          <TextField
            label="url"
            {...url}
            data-testid="url"
            name="Url"
            placeholder="write url here"
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          create
        </Button>
      </form>
    </div>
  ) : (
    <Button variant="contained" color="primary" onClick={toggleVisibility}>
      create
    </Button>
  );
}

export default BlogForm;
