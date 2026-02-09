import { useDominantColor } from "../hooks/useDominantColor";

export default function VideoCard({ video }) {
  const hoverColor = useDominantColor(video.thumbnail);

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-neutral-900 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Strong Hover Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at center, ${hoverColor}55 0%, transparent 60%)`,
        }}
      />

      {/* Image Wrapper */}
      <div className="relative overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-contain bg-white transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-white">
          {video.title}
        </h3>
        <p className="text-xs text-neutral-400 mt-2 capitalize">
          {video.channel}
        </p>
      </div>
    </div>
  );
}