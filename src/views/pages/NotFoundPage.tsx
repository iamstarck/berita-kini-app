import Error404Illustration from "@/assets/404_illustration.svg?react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Error404Illustration className="h-100" />

      <Button asChild>
        <Link to={"/"}>Back to Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
