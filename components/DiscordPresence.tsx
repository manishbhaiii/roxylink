import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { useLanyardStore } from "@/lib/lanyard";
import { initializeLanyardConnection } from "@/lib/lanyard";

const GLOW_COLORS = [
  "rgb(115, 0, 255)", 
  "rgb(255, 0, 153)", 
  "rgb(0, 255, 179)",  
  "rgb(0, 229, 255)", 
  "rgb(30, 0, 255)",  
  "rgb(255, 64, 0)", 
];

// Time formatting utilities
const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
};

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const getElapsedTime = (timestamp: number): number => {
  return Math.floor((Date.now() - timestamp) / 1000);
};

function getStatusColor(status: string) {
  switch (status) {
    case "online":
      return {
        color: "#10B981",
        glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
      };
    case "idle":
      return {
        color: "#F59E0B",
        glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
      };
    case "dnd":
      return {
        color: "#EF4444",
        glow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
      };
    default:
      return {
        color: "#6e5a50",
        glow: "hover:shadow-[0_0_30px_rgba(110,90,80,0.2)]",
      };
  }
}

function StatusIndicator({ status }: { status: string }) {
  const { color } = getStatusColor(status);
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm text-gray-400 capitalize">{status}</span>
    </div>
  );
}

function CustomStatus({ customStatus }: { customStatus: any }) {
  if (!customStatus?.text && !customStatus?.emoji_name) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      {customStatus.emoji_name && (
        <span>
          {customStatus.emoji_id ? (
            <img
              src={`https://cdn.discordapp.com/emojis/${customStatus.emoji_id}.png`}
              alt={customStatus.emoji_name}
              className="w-4 h-4 inline"
            />
          ) : (
            customStatus.emoji_name
          )}
        </span>
      )}
      {customStatus.text && (
        <span className="truncate max-w-[200px]">{customStatus.text}</span>
      )}
    </div>
  );
}

function ProgressBar({ elapsed, total }: { elapsed: number; total: number }) {
  const progress = (elapsed / total) * 100;

  return (
    <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-[#9B5DE5] via-[#F15BB5] to-[#9B5DE5] animate-gradient-xy"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundSize: '300% 300%'
        }}
      />
    </div>
  );
}

function ActivityCard({ activity }: { activity: any }) {
  const [elapsed, setElapsed] = useState<number>(0);

  useEffect(() => {
    if (!activity.timestamps?.start) return;

    const updateElapsed = () => {
      setElapsed(getElapsedTime(activity.timestamps.start));
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);

    return () => clearInterval(interval);
  }, [activity.timestamps?.start]);

  const getActivityAsset = () => {
    if (!activity.assets?.large_image) return undefined;

    // Handle Spotify activity
    if (activity.type === 2 && activity.assets.large_image.startsWith('spotify:')) {
      const spotifyImageId = activity.assets.large_image.replace('spotify:', '');
      return `https://i.scdn.co/image/${spotifyImageId}`;
    }

    // Handle external media
    if (activity.assets.large_image.startsWith('mp:external/')) {
      return `https://media.discordapp.net/external/${activity.assets.large_image.replace('mp:external/', '')}`;
    }

    // Handle regular Discord activity assets
    if (activity.assets.large_image.startsWith('mp:')) {
      return `https://media.discordapp.net/${activity.assets.large_image.replace('mp:', '')}`;
    }

    // Handle direct URLs
    if (activity.assets.large_image.startsWith('http')) {
      return activity.assets.large_image;
    }

    // Default Discord application asset
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
  };

  const imageUrl = getActivityAsset();
  const isSpotify = activity.type === 2;
  const isGame = activity.type === 0;
  const hasProgress = isSpotify && activity.timestamps?.start && activity.timestamps?.end;
  const totalDuration = hasProgress ? (activity.timestamps.end - activity.timestamps.start) / 1000 : 0;

  return (
    <div className="flex flex-col gap-3 bg-black/20 rounded-lg p-4">
      <div className="flex items-center gap-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={activity.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span className="text-base font-medium truncate">{activity.name}</span>
          {activity.details && (
            <span className="text-sm text-gray-400 truncate">{activity.details}</span>
          )}
          {activity.state && (
            <span className="text-sm text-gray-400 truncate">{activity.state}</span>
          )}
          {(isGame || (!isSpotify && activity.timestamps?.start)) && (
            <span className="text-sm bg-gradient-to-r from-[#9B5DE5] via-[#F15BB5] to-[#9B5DE5] bg-clip-text text-transparent animate-gradient-xy" style={{ backgroundSize: '300% 300%' }}>
              {isGame ? 'Playing' : 'Active'} for {formatTime(elapsed)}
            </span>
          )}
        </div>
      </div>

      {hasProgress && (
        <div className="flex flex-col gap-2">
          <ProgressBar elapsed={elapsed} total={totalDuration} />
          <div className="flex justify-between text-sm font-medium">
            <span className="bg-gradient-to-r from-[#9B5DE5] via-[#F15BB5] to-[#9B5DE5] bg-clip-text text-transparent animate-gradient-xy" style={{ backgroundSize: '300% 300%' }}>
              {formatDuration(elapsed)}
            </span>
            <span className="bg-gradient-to-r from-[#9B5DE5] via-[#F15BB5] to-[#9B5DE5] bg-clip-text text-transparent animate-gradient-xy" style={{ backgroundSize: '300% 300%' }}>
              {formatDuration(totalDuration)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DiscordPresence() {
  const data = useLanyardStore((state) => state.data);
  const error = useLanyardStore((state) => state.error);
  const isConnected = useLanyardStore((state) => state.isConnected);
  const [glowIndex, setGlowIndex] = useState(0);
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false);

  useEffect(() => {
    // Add a small delay to prevent the WebSocket connection state error
    const timer = setTimeout(() => {
      initializeLanyardConnection();
      setHasAttemptedConnection(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Simple automatic color cycling every 3 seconds
  useEffect(() => {
    const colorCycleInterval = setInterval(() => {
      setGlowIndex((prev) => (prev + 1) % GLOW_COLORS.length);
    }, 3000); // Change color every 3 seconds
    
    return () => clearInterval(colorCycleInterval);
  }, []);

  const cycleGlow = useCallback(() => {
    setGlowIndex((prev) => (prev + 1) % GLOW_COLORS.length);
  }, []);

  // Don't render anything if we haven't attempted connection yet
  if (!hasAttemptedConnection) {
    return null;
  }

  // Don't render if there's no data and no error (still connecting)
  if (!data && !error) {
    return null;
  }
  
  // Don't render if data is null
  if (!data) {
    return null;
  }

  const avatarUrl = data.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discord_user.id) % 5}.png`;

  const statusColors = getStatusColor(data.discord_status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mb-12"
    >
      <Card
        className="relative overflow-hidden cursor-pointer
          bg-gradient-to-br from-[hsl(240,10%,3.9%)] to-[hsl(240,10%,5.9%)]
          shadow-xl shadow-black/20
          transition-all duration-500 ease-in-out
          group hover:scale-[1.02] hover:shadow-2xl"
        onMouseEnter={cycleGlow}
      >
        {/* Breathing Glow Border */}
        <div 
          className="absolute inset-0 rounded-lg z-10 pointer-events-none breathing-glow"
          style={{
            '--current-color': GLOW_COLORS[glowIndex],
          } as React.CSSProperties}
        />
        {/* Inner content background */}
        <div className="absolute inset-[2px] bg-gradient-to-br from-[hsl(240,10%,3.9%)] to-[hsl(240,10%,5.9%)] rounded-lg z-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(271,52%,59%)]/5 to-[hsl(277,56%,50%)]/5 transition-opacity duration-500 group-hover:opacity-20 z-0" />
        <div className="absolute inset-0 backdrop-blur-3xl z-0" />
        <CardContent className="relative p-6 space-y-6 z-20">
          {/* User Info Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatarUrl}
                alt={data.discord_user.global_name || data.discord_user.username}
                className="w-14 h-14 rounded-full ring-2 ring-[hsl(271,52%,59%)]/20 transition-all duration-500 group-hover:ring-[hsl(271,52%,59%)]/40 group-hover:shadow-lg mt-4"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xl font-semibold bg-gradient-to-r from-[hsl(271,52%,59%)] to-[hsl(277,56%,50%)] bg-clip-text text-transparent">
                {data.discord_user.global_name || data.discord_user.username}
              </span>
              <StatusIndicator status={data.discord_status} />
              <CustomStatus customStatus={data.custom_status} />
            </div>
          </div>

          {/* Activities Section */}
          {data.activities?.length > 0 && (
            <div className="space-y-4 pt-2">
              {data.activities
                ?.filter((a) => a.type !== 4)
                .map((activity, index) => (
                  <ActivityCard key={`${activity.id}-${index}`} activity={activity} />
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}