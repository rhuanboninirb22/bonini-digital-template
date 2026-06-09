import { ArrowUpRight, MessageSquare } from 'lucide-react';

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5521970853896?text=Ol%C3%A1!+Gostaria+de+solicitar+um+or%C3%A7amento+para+um+site+com+a+Bonini+Digital."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_24px_80px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-110"
      aria-label="Abrir WhatsApp"
    >
      <MessageSquare className="h-7 w-7" />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
};

export default WhatsAppFloat;
