import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ActionStatus({ description, variant }) {
  return (
    <Alert variant={variant}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>
        {variant === "success" && "Successful"}
        {variant === "destructive" && "Unsuccessful"}
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
