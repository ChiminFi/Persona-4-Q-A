import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace";
import { ChatSource } from "@/types/chat";
import { ArrowUpRightIcon, BookMarkedIcon } from "lucide-react";

interface SourcesProps {
  sources: ChatSource[];
}

function Sources({ sources }: SourcesProps) {
  return (
    <Trace>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <BookMarkedIcon />
            </TraceIcon>
            <TraceTitle>Used {sources.length} sources</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>

        <TraceCollapsibleContent>
          <Trace>
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
              >
                <TraceLine>
                  <TraceTitle>
                    {source.title ?? new URL(source.href).hostname}
                    <span className="sr-only">(open in a new tab)</span>
                  </TraceTitle>
                  <TraceIcon>
                    <ArrowUpRightIcon />
                  </TraceIcon>
                </TraceLine>
              </a>
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  );
}

export default Sources;
