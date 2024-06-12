import { render, screen } from "@testing-library/react";
import Blog from "../components/blog/Blog.jsx";
import userEvent from "@testing-library/user-event";

describe("Blog", () => {
  const blog = {
    title: "example title",
    author: "example author",
    url: "example url",
    likes: 0,
  };
  let container;
  let likeMock;

  beforeEach(() => {
    likeMock = vi.fn();
    container = render(
      <Blog
        blog={blog}
        handleLike={likeMock}
        handleDelete={null}
        ownedByUser={false}
      ></Blog>,
    ).container;
  });

  test("initially title is rendered", () => {
    expect(container).toHaveTextContent("example title");
  });

  test("initially author is rendered", () => {
    expect(container).toHaveTextContent("example author");
  });

  test("initially url is not rendered", () => {
    expect(container).not.toHaveTextContent("example url");
  });

  test("initially likes not defined", () => {
    expect(container).not.toHaveTextContent("likes");
  });

  test("blog's url and number of likes are shown when button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view", { exact: false });
    await user.click(button);

    expect(container).toHaveTextContent("example url");
    expect(container).toHaveTextContent("likes");
  });

  test("like button clicked twice works", async () => {
    const user = userEvent.setup();
    const view = screen.getByText("view", { exact: false });
    await user.click(view);
    const like = screen.getByText("like", { exact: true });
    await user.click(like);
    await user.click(like);

    expect(likeMock.mock.calls).toHaveLength(2);
  });
});
