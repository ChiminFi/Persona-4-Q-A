import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChatMessage } from "@/types/chat";
import { AlertCircleIcon } from "lucide-react";

interface AlertCardProps {
  content: ChatMessage["content"];
}

function AlertCard({ content }: AlertCardProps) {
  return (
    <Alert
      variant="destructive"
      className="border border-[rgb(150_70_50/0.35)] bg-[rgb(150_70_50/0.08)]"
    >
      <AlertCircleIcon />
      <AlertTitle>Failed to generate response</AlertTitle>
      <AlertDescription>{content}</AlertDescription>
    </Alert>
  );
}

export default AlertCard;
