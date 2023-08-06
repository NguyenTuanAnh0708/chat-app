// const addNewUser = async (displayName, email, photoUrl, uid, providerId) => {
//   try {
//     const docRef = await addDoc(collection(db, "users"), {
//       displayName: displayName,
//       email: email,
//       photoUrl: photoUrl,
//       uid: uid,
//       providerId: providerId,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "./config";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
const addCollection = async (Namecollection, data) => {
  try {
    const docRef = await addDoc(collection(db, Namecollection), {
      ...data,
      createAt: serverTimestamp(),
    });
    console.log(
      `Document add in collection ${Namecollection} written with ID: `,
      docRef.id
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const saveFileFireStorage = async (file) => {
  const storageRef = ref(storage, file.name);
  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, file);
  const imgsUrl = await getFileUrl(file.name);
  return imgsUrl;
};
const getFileUrl = async (name) => {
  const imgRef = ref(storage, name);
  console.log(name);
  try {
    const url = await getDownloadURL(imgRef);
    return url;
  } catch {
    return null;
  }
};
const updateNewDataCollection = async (collectionName, idDoc, value) => {
  const collectionRef = doc(db, collectionName, idDoc);

  await updateDoc(collectionRef, {
    ...value,
  });
};
export { addCollection, saveFileFireStorage, updateNewDataCollection };
