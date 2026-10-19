import Background from "@/components/Background";
import ChatPanel from "@/components/ChatPanel";
import Tv from "@/components/Tv";

function Page() {
  return (
    <div className="w-full min-h-dvh">
      <Background />
      <Tv>
        <ChatPanel />
      </Tv>
    </div>
  );
}

export default Page;
