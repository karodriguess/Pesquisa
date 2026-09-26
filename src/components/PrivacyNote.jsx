export default function PrivacyNote({ className = "" }) {
  return (
    <p
      className={`animate-fade-up text-[11px] leading-relaxed text-gray-400 ${className}`}
      style={{ animationDelay: "240ms" }}
    >
      Sua privacidade é importante. As informações coletadas serão utilizadas
      apenas para fins dessa pesquisa.
    </p>
  );
}
