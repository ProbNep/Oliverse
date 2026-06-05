import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoginScene } from "@/components/oliverse/LoginScene";
import { SpaceJourney } from "@/components/oliverse/SpaceJourney";
import { StarField } from "@/components/oliverse/StarField";
import { clearState, loadState, saveState } from "@/lib/oliverse-storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oliverse — A Birthday in the Stars" },
      { name: "description", content: "A handcrafted, romantic space journey gift for someone special." },
      { property: "og:title", content: "Oliverse" },
      { property: "og:description", content: "A handcrafted, romantic space journey gift." },
    ],
  }),
  component: Index,
});

function Index() {
  // 'booting' is the short "Preparing launch..." sequence on returning visits.
  const [stage, setStage] = useState<"loading" | "booting" | "login" | "journey">("loading");

  useEffect(() => {
    const s = loadState();
    if (s.loggedIn) {
      setStage("booting");
      const t = setTimeout(() => setStage("journey"), 2200);
      return () => clearTimeout(t);
    } else {
      setStage("login");
    }
  }, []);

  function handleAuthenticated() {
    saveState({ loggedIn: true });
    setStage("journey");
  }

  function handleLogout() {
    clearState();
    setStage("login");
  }

  return (
    <AnimatePresence mode="wait">
      {stage === "loading" && <div key="blank" className="min-h-screen cosmic-bg" />}
      {stage === "booting" && (
        <motion.div
          key="boot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-screen cosmic-bg flex items-center justify-center"
        >
          <StarField density={120} />
          <div className="relative text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-accent">Oliverse</p>
            <p className="mt-3 text-2xl md:text-3xl font-semibold text-glow">Preparing launch…</p>
            <div className="mt-6 mx-auto h-1 w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
      {stage === "login" && (
        <motion.div key="login" exit={{ opacity: 0 }}>
          <LoginScene onAuthenticated={handleAuthenticated} />
        </motion.div>
      )}
      {stage === "journey" && (
        <motion.div
          key="journey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <SpaceJourney onLogout={handleLogout} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
