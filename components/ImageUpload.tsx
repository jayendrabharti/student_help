import { Loader2Icon, UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  uploading?: boolean;
  text?: string;
}

export default function ImageUpload({
  className,
  onChange,
  uploading,
  text,
}: ImageUploadProps) {
  return (
    <div
      className={cn(
        "cursor-pointer relative flex flex-col items-center justify-center rounded-xl overflow-hidden outline-4 outline-[--border] outline-dashed",
        className
      )}
    >
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={onChange}
        className={cn("cursor-pointer w-full h-full absolute opacity-0")}
      />
      {uploading ? (
        <Loader2Icon className="size-16 m-4 text-muted-foreground animate-spin" />
      ) : (
        <UploadIcon className="size-16 m-4 text-muted-foreground" />
      )}
      <span className="font-bold text-lg mx-4 mb-4 text-[--foreground]">
        {text}
      </span>
      <span className="text-xs text-muted-foreground">
        (Click to Select or Drag & Drop)
      </span>
    </div>
  );
}
