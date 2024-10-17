import { create } from "zustand"

/**
 * @typedef {Object} User
 * @property {string} name - The user's name.
 * @property {string} email - The user's email.
 * @property {string} uuid - The user's uuid.
 */

/**
 * @typedef {Object} Profile
 * @property {number} profile_id - The profile's id.
 * @property {string} profile_name - The profile's name.
 */

/**
 * @typedef {Object} AuthStore
 * @property {User|null} user - The user object.
 * @property {Profile[]} profiles - The user's profiles.
 * @property {function} hasProfile - A function that checks if the user has a specific profile.
 * @property {function} hasProfiles - A function that checks if the user has any of the specified profiles.
 * @property {function} checkSession - A function that checks the user's session and updates the store.
 */

/**
 * A custom hook that provides authentication functionality.
 * 
 * @returns {AuthStore} The authentication store.
 */


// WORKING: tipar este objeto de contastantes
export const SESSIONS_STATUS = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated"
} as const;

export type SESSION_STATUS = typeof SESSIONS_STATUS[keyof typeof SESSIONS_STATUS];

export interface User {
  name: string;
  email: string;
  uuid: string;
}

export interface Profile {
  profile_id: number;
  profile_name: string;
}

export interface State {
  user: User | null;
  profiles: Profile[];
  sessionStatus: SESSION_STATUS;
  hasProfile: (profile: string) => boolean;
  hasProfiles: (profiles: string[]) => boolean;
  checkSession: () => void;
}

export function createAuthStore (
  simulateAdmin: boolean,
  getSession: () => Promise<User>,
  getUserProfiles: (uuid: string) => Promise<Profile[]>
) {
  return create<State>(
    (set, get) => (
      {
        // ----[ State ]----
        user: null,
        profiles: [],
        sessionStatus: SESSIONS_STATUS.LOADING,



        // ----[ Functions ]----

        // Check if the user has a specific profile.
        hasProfile: (profile) => {
          return get().profiles.some(prof => prof.profile_name === profile);
        },

        // Check if the user has any of the specified profiles.
        hasProfiles: (profiles) => {
          return profiles.some(profile => get().profiles.some(prof => prof.profile_name === profile));
        },

        // Fetch the user's session, profiles and update the store.
        checkSession: async () => {
          set({ sessionStatus: SESSIONS_STATUS.LOADING });
          // WORKING: manejar el loading infinito cuando el api retorna un error
          try {
            const user = await getSession();

            if (!user) {
              set({ user: null, profiles: [], sessionStatus: SESSIONS_STATUS.UNAUTHENTICATED });
              return;
            }

            if (simulateAdmin) {
              set({ user, profiles: [{ profile_name: "Admin", profile_id: 14 }], sessionStatus: SESSIONS_STATUS.AUTHENTICATED })
              return;
            }

            const profiles = await getUserProfiles(user.uuid);

            // Update the store.
            set({ user, profiles: [...profiles], sessionStatus: SESSIONS_STATUS.AUTHENTICATED });

          } catch (e) {
            console.error('Error checking session:', e);
            set({ user: null, profiles: [], sessionStatus: SESSIONS_STATUS.UNAUTHENTICATED });
            return;
          }
        }
      }
    )
  )
}