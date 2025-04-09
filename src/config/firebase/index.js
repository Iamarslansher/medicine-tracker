import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCdqiZSHheza0SNOZU2Ms4xk6l7ct3bA8",
  authDomain: "med-care-7709c.firebaseapp.com",
  projectId: "med-care-7709c",
  storageBucket: "med-care-7709c.firebasestorage.app",
  messagingSenderId: "465222980654",
  appId: "1:465222980654:web:2dcdfdb91bfa71593f3bbf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//   Signup function
export const signup = async (userInfo) => {
  try {
    const { userName, userEmail, userPassword } = userInfo;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    const userId = userCredential.user.uid;
    const date = new Date();
    const data = {
      userName,
      userEmail,
      accountCreatedAt: date.toLocaleDateString(),
      userId,
      isLogedin: true,
    };
    localStorage.setItem("currentMedCareUser", JSON.stringify(data));
    await setDoc(doc(db, "users", userId), data);
    console.log("Signup successful!");
    return true;
  } catch (error) {
    console.error("Signup failed:", error);
  }
};

// Login function
export const login = async (userInfo) => {
  try {
    const { email, password } = userInfo;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      localStorage.setItem("currentMedCareUser", JSON.stringify(data));
    }

    return true;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// Logout function
export const logout = async () => {
  try {
    await auth.signOut();
    localStorage.removeItem("currentMedCareUser");
    return true;
    console.log("Logout successful!");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// Add medicine function
export const addMedicine = async (medicineData) => {
  try {
    const {
      userName,
      userId,
      medicineName,
      purchaseDate,
      expiryDate,
      doctorName,
    } = medicineData;

    const medicineCollectionRef = collection(
      db,
      "medicines-list",
      userId,
      "medicines"
    );

    const docRef = await addDoc(medicineCollectionRef, medicineData);
    await updateDoc(docRef, {
      medicineID: docRef.id,
    });
    alert("Medicine added successfully!");
  } catch (error) {
    console.log(error.message);
  }
};

// Get medicines function
export const getMedicines = async (userId) => {
  try {
    const medicinesRef = collection(db, "medicines-list", userId, "medicines");
    const querySnapshot = await getDocs(medicinesRef);
    const medicines = [];
    querySnapshot.forEach((doc) => {
      const medicine = doc.data();
      medicines.push(medicine);
    });
    return medicines;
  } catch (error) {
    console.log(error.message);
  }
};

// Delete Medicine
export const deleteMedi = async (medId) => {
  try {
    const { medicineID, userID } = medId;

    const medicinesRef = collection(db, "medicines-list", userID, "medicines");
    const querySnapshot = await getDocs(medicinesRef);
    querySnapshot.forEach(async (docu) => {
      const data = docu.data();
      if (data.medicineID === medicineID) {
        const docRef = doc(db, "medicines-list", userID, "medicines", docu.id);
        await deleteDoc(docRef);
        alert("Deleted");
      }
    });

    return;
  } catch (error) {
    console.log(error.message);
  }
};
