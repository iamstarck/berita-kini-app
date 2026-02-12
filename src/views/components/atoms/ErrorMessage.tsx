import { CircleAlertIcon } from "lucide-react";

const ErrorMessage = () => {
  return (
    <p className="inline-flex items-center gap-1 text-destructive">
      <CircleAlertIcon size={14} /> Gagal memuat berita
    </p>
  );
};

export default ErrorMessage;
