let auth: any = null
let db: any = null
let storage: any = null

// Check if we're in a browser environment and Firebase is available
if (typeof window !== "undefined") {
  try {
    const { initializeApp, getApps } = require("firebase/app")
    const { getAuth } = require("firebase/auth")
    const { getFirestore } = require("firebase/firestore")
    const { getStorage } = require("firebase/storage")

    const firebaseConfig = {
      apiKey: "AIzaSyAYmmjUCKcw3jfKjuuVJPRae4wycJX14uk",
      authDomain: "web-retainer.firebaseapp.com",
      projectId: "web-retainer",
      storageBucket: "web-retainer.firebasestorage.app",
      messagingSenderId: "77892088801",
      appId: "1:77892088801:web:539b32452a7ccc8aced8a0",
    }

    // Initialize Firebase only if it hasn't been initialized already
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
  } catch (error) {
    console.log("Firebase initialization error (using fallback):", error)
    // Fallback to mock services
    auth = createMockAuth()
    db = createMockDb()
    storage = createMockStorage()
  }
} else {
  // Server-side or preview environment - use mock services
  auth = createMockAuth()
  db = createMockDb()
  storage = createMockStorage()
}

function createMockAuth() {
  return {
    currentUser: null,
    onAuthStateChanged: (callback: (user: any) => void, errorCallback?: (error: any) => void) => {
      setTimeout(() => callback(null), 100)
      return () => {} // unsubscribe function
    },
    signInWithEmailAndPassword: async (email: string, password: string) => {
      if (email === "admin@tiepie.com" && password === "admin123") {
        return { user: { uid: "mock-admin", email: "admin@tiepie.com" } }
      }
      throw new Error("Invalid credentials")
    },
    signOut: async () => {
      return Promise.resolve()
    },
  }
}

function createMockDb() {
  return {
    collection: (name: string) => ({
      getDocs: async () => ({
        docs: [],
        forEach: () => {},
      }),
      addDoc: async (data: any) => ({ id: "mock-id-" + Date.now() }),
    }),
  }
}

function createMockStorage() {
  return {
    ref: () => ({
      uploadBytes: async () => ({ ref: { getDownloadURL: async () => "/placeholder.svg" } }),
    }),
  }
}

export { auth, db, storage }
export default null
