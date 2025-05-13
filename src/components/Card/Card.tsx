import { type ComponentType } from "react";
import { Loader2, Check } from "lucide-react";
import { with3D } from "./with3D";
import { PayloadItem } from "../../types/api";

interface CardProps {
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  iconColor?: string;
  loading?: boolean;
  progress?: number; // 0-100
  payload?: PayloadItem[];
}

const CardBase = ({
  title,
  description,
  icon: Icon,
  iconColor = "text-blue-500",
  loading = false,
  progress = 80,
  payload = [],
}: CardProps) => {
  return (
    <div
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white border border-black/10 dark:border-white/10 mb-6 font-sans dark:bg-[#1A1A1A] shadow-xl cursor-default"
      tabIndex={0}
    >
      <div className="flex gap-4 items-center p-4">
        <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
          <Icon size={20} className={iconColor} />
        </div>

        <div className="flex-1">
          <h2 className="select-none text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 leading-relaxed">
            {title}
          </h2>

          <p className="select-none text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-1">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-black dark:text-white" />
          ) : (
            <Check className="h-5 w-5 text-green-500" />
          )}
        </div>
      </div>

      <div className="h-1 w-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {payload.length > 0 && (
        <div className="px-4 py-2 bg-black/5 dark:bg-white/5">
          {payload.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <span className="text-xs text-black dark:text-white line-clamp-1">
                {item.key}
              </span>

              {item.value ? (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 text-blue-600 dark:text-blue-400 line-clamp-1">
                  {item.value}
                </span>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Card = with3D(CardBase);

export default Card;
