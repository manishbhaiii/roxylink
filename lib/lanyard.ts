import { create } from 'zustand';

// Types for Lanyard API
export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  global_name?: string;
}

export interface Activity {
  id: string;
  name: string;
  type: number;
  url?: string;
  details?: string;
  state?: string;
  application_id?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface CustomStatus {
  text?: string;
  emoji_name?: string;
  emoji_id?: string;
}

export interface LanyardData {
  discord_user: DiscordUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Activity[];
  custom_status?: CustomStatus;
  listening_to_spotify: boolean;
}

// Zustand store for Lanyard data
interface LanyardStore {
  data: LanyardData | null;
  error: string | null;
  isConnected: boolean;
  setData: (data: LanyardData) => void;
  setError: (error: string) => void;
  setConnected: (connected: boolean) => void;
}

export const useLanyardStore = create<LanyardStore>((set) => ({
  data: null,
  error: null,
  isConnected: false,
  setData: (data) => set({ data, error: null }),
  setError: (error) => set({ error, isConnected: false }),
  setConnected: (connected) => set({ isConnected: connected }),
}));

// Replace this with your Discord user ID
let DISCORD_USER_ID = '1050078541174366278'; // Default fallback

// Function to get Discord user ID from config
const getDiscordUserId = async (): Promise<string> => {
  try {
    const config = await import('../config.json');
    return config.discordUserId || DISCORD_USER_ID;
  } catch {
    return DISCORD_USER_ID;
  }
};

let ws: WebSocket | null = null;
let reconnectTimeout: NodeJS.Timeout | null = null;
let heartbeatInterval: NodeJS.Timeout | null = null;

// Function to safely send WebSocket messages
const safeSend = (message: any) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
    return true;
  }
  return false;
};

export function initializeLanyardConnection() {
  if (typeof window === 'undefined') return; // Don't run on server
  
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    return; // Already connected or connecting
  }

  const store = useLanyardStore.getState();
  
  // Get Discord user ID first
  getDiscordUserId().then(userId => {
    DISCORD_USER_ID = userId;
    
    try {
      ws = new WebSocket('wss://api.lanyard.rest/socket');
      
      // Set a timeout for connection
      const connectionTimeout = setTimeout(() => {
        if (ws && ws.readyState === WebSocket.CONNECTING) {
          console.warn('WebSocket connection timeout');
          ws.close();
        }
      }, 10000); // 10 second timeout
      
      ws.onopen = () => {
        console.log('Connected to Lanyard');
        clearTimeout(connectionTimeout);
        store.setConnected(true);
        
        // Subscribe to user updates - use safe send function
        const subscribeMessage = {
          op: 2,
          d: {
            subscribe_to_id: DISCORD_USER_ID
          }
        };
        
        // Try to send immediately, if it fails, retry after a short delay
        if (!safeSend(subscribeMessage)) {
          setTimeout(() => {
            safeSend(subscribeMessage);
          }, 100);
        }
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          // Handle different message types
          if (message.op === 1) {
            // Heartbeat request
            safeSend({ op: 3 });
          } else if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
            if (message.d) {
              store.setData(message.d);
            }
          }
        } catch (error) {
          console.error('Error parsing Lanyard message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('Disconnected from Lanyard:', event.code, event.reason);
        clearTimeout(connectionTimeout);
        store.setConnected(false);
        
        // Reconnect after 5 seconds unless it was a normal close
        if (event.code !== 1000 && event.code !== 1001) {
          reconnectTimeout = setTimeout(() => {
            console.log('Attempting to reconnect to Lanyard...');
            initializeLanyardConnection();
          }, 5000);
        }
      };

      ws.onerror = (error) => {
        console.error('Lanyard WebSocket error:', error);
        clearTimeout(connectionTimeout);
        store.setError('Connection failed');
      };
      
    } catch (error) {
      console.error('Failed to initialize Lanyard connection:', error);
      store.setError('Failed to connect');
    }
  }).catch(error => {
    console.error('Failed to get Discord user ID:', error);
    store.setError('Configuration error');
  });
}

// Cleanup function
export function cleanupLanyardConnection() {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
  
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
  
  if (ws) {
    ws.close(1000, 'Component unmounted');
    ws = null;
  }
}

// Alternative REST API fallback
export async function fetchLanyardData(): Promise<LanyardData | null> {
  try {
    const userId = await getDiscordUserId();
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch');
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Failed to fetch Lanyard data:', error);
    return null;
  }
}