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
  where,
  query,
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

// Add user exercise
export const addExerciseToFirestore = async (exeInfo) => {
  const { userID, exerciseName, exerciseReps, date } = exeInfo;
  console.log({
    userID,
    exerciseName,
    exerciseReps,
    date,
  });
  try {
    const exercisesRef = collection(
      db,
      "exercise-routines",
      userID,
      "exercises"
    );
    const data = {
      ...exeInfo,
      completed: false,
    };
    const docRef = await addDoc(exercisesRef, data);
    await updateDoc(docRef, {
      exerciseID: docRef.id,
    });
    console.log("eexercise added");
  } catch (error) {
    console.error("Error adding exercise:", error);
  }
};

// 🔁 Fetch exercises for today
export const fetchExercisesForToday = async (info) => {
  const { userID, date } = info;
  try {
    const exercisesRef = collection(
      db,
      "exercise-routines",
      userID,
      "exercises"
    );
    // const qury = query(exercisesRef, where("date", "==", date));
    const snapshot = await getDocs(exercisesRef);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};

// ✅ Mark exercise as completed
export const markExerciseCompleted = async (userID, exerciseId) => {
  try {
    const docRef = doc(
      db,
      "exercise-routines",
      userID,
      "exercises",
      exerciseId
    );
    await updateDoc(docRef, { completed: true });
  } catch (error) {
    console.error("Error marking exercise completed:", error);
  }
};

// ❌ Delete exercise
export const deleteExerciseFromFirestore = async (userID, exerciseId) => {
  try {
    const docRef = doc(
      db,
      "exercise-routines",
      userID,
      "exercises",
      exerciseId
    );
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting exercise:", error);
  }
};
