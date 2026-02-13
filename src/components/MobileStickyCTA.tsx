import { Link } from "react-router-dom";

const MobileStickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background shadow-[0_-2px_16px_rgba(0,0,0,0.08)] p-5 lg:hidden">
      <p className="text-sm text-muted-foreground text-center mb-3">
        Не знаете к кому записаться?
      </p>
      <Link
        to="/appointment"
        className="flex items-center justify-center w-full h-12 bg-primary text-primary-foreground rounded-xl text-base font-semibold active:scale-[0.98] transition-transform duration-200"
      >
        Бесплатная консультация
      </Link>
    </div>
  );
};

export default MobileStickyCTA;
