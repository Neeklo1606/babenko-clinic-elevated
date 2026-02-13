import { Phone, MessageCircle } from "lucide-react";

const MobileContacts = () => {
  return (
    <section className="lg:hidden py-8 px-4 bg-background">
      <h2 className="text-[28px] font-semibold text-primary mb-6">Контакты</h2>
      <div className="flex flex-col gap-3">
        <a
          href="tel:+73843123456"
          className="flex items-center gap-4 bg-card rounded-xl border border-border p-5 shadow-sm active:shadow-md transition-all duration-200"
        >
          <Phone className="w-6 h-6 text-primary shrink-0" />
          <div>
            <span className="text-2xl font-medium text-primary block">+7 (3843) 123-456</span>
            <span className="text-sm text-muted-foreground">Позвонить</span>
          </div>
        </a>
        <a
          href="https://wa.me/73843123456"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-card rounded-xl border border-border p-5 shadow-sm active:shadow-md transition-all duration-200"
        >
          <MessageCircle className="w-6 h-6 text-[#25D366] shrink-0" />
          <span className="text-lg font-medium text-[#25D366]">Написать в WhatsApp</span>
        </a>
      </div>
    </section>
  );
};

export default MobileContacts;
