import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}

export const Title: React.FC<Props> = ({ title, className, ...props }) => {
  return (
    <h2
      className={cn(
        "relative flex justify-center items-center p-20",
        className
      )}
      {...props}
    >
      <span className="relative z-10 text-2xl md:text-3xl font-bold text-center font-redhat text-white uppercase">
        {title}
      </span>
      <span className="absolute inset-0 flex justify-center tracking-widest items-center text-orange-500 font-street text-7xl md:text-8xl font-bold filter blur-sm opacity-50">
        Butterfly
      </span>
    </h2>
  );
};
