import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ReactElement } from "react";

type Props = {
  statusCode: number;
  message: string;
  description: string;
  button?: ReactElement;
};

const NotFound = ({ statusCode, message, description, button }: Props) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-orange-600">
            {statusCode}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl hover:text-orange-400">
            {message}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {description}
          </p>
          {button ? (
            button
          ) : (
            <Link to={"/"}>
              <Button className="inline-flex text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
                {"Back to Homepage"}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default NotFound;
