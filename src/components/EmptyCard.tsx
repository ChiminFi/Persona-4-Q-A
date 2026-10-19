"use client";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getTimeOfDay, TimeOfDay } from "@/lib/time";
import { MessageCircleDashedIcon } from "lucide-react";
import { useState } from "react";

function EmptyCard() {
  const [time] = useState<TimeOfDay>(() => getTimeOfDay() || "hello");

  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-transparent">
          <MessageCircleDashedIcon />
        </EmptyMedia>
        <EmptyTitle className="capitalize">{time}.</EmptyTitle>
        <EmptyDescription>Start a conversation from here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export default EmptyCard;
