import { useEffect, useState } from "react";
import {
  query,
  where,
  orderBy,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
const useFireStore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    let collectionRef = collection(db, collectionName);
    // collectionRef = query(collectionRef, orderBy("createAt"));

    /**
     * codition format
     * {
     * fildName:'members'
     * operator:"==" or in
     * compareValue:"abc" or []
     * }
     */

    if (condition) {
      if (!condition.compareValue || condition.compareValue.length == 0) {
        setDocuments([]);
        return;
      } else {
        collectionRef = query(
          collectionRef,
          where(condition.fieldName, condition.operator, condition.compareValue)
        );
      }

      const unsub = onSnapshot(
        collectionRef,
        { includeMetadataChanges: true },
        (snapShot) => {
          const data = snapShot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setDocuments(data);
        }
      );
      return unsub;
    }
  }, [collectionName, condition]);
  console.log({ roms: documents });
  return documents;
};
export default useFireStore;
