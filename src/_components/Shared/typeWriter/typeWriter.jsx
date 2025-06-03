import { useTypewriter } from "nextjs-simple-typewriter";
const TypewriterClient = ({ words, emoji, options }) => {
  const [text, handler] = useTypewriter({
    words: [...words],
    loop: options?.loop || true, // Optionally set loop for continuous typing effect
    delay: options?.delay || 40, // Adjust typing speed (milliseconds)
  });
  const { isDelay } = handler;
  return (
    <>
      <span
        style={{
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "5px",
        }}
      >
        {text}
        {isDelay && emoji && (
          <span
            className="mb5"
            dangerouslySetInnerHTML={{ __html: `&#${emoji};` }}
          />
        )}
      </span>
    </>
  );
};

export default TypewriterClient;
