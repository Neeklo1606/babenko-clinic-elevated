import { Link } from "react-router-dom";

const Wordmark = () => (
  <Link to="/" aria-label="На главную" className="flex h-11 items-center gap-1.5 text-[19px] font-semibold tracking-[-0.03em] text-ink">
    <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-[7px] bg-graphite">
      <span className="h-1.5 w-1.5 rounded-full bg-lime" />
    </span>
    дента
  </Link>
);

export default Wordmark;
