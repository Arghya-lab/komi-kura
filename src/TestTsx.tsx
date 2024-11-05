import type { FC } from "hono/jsx";

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
};

export const Top: FC<{ messages: string[] }> = (props: {
  messages: string[];
}) => {
  return (
    <>
      <link rel="stylesheet" href="/assets/global.css" />
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>;
        })}
      </ul>
    </>
  );
};
