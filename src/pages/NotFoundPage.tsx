import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
      <AlertCircle className="w-16 h-16 text-yellow-500" />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground text-lg">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="text-primary hover:underline mt-4">
        Return to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
